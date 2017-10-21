angular.module("project").controller("resultCtrl", ["$scope", "$http", '$sce', '$rootScope', '$filter', '$location', '$timeout', 'restService', 'postService', 'spinnerService',
    function ($scope, $http, $sce, $rootScope, $filter, $location, $timeout, restService, postService, spinnerService) {

        $scope.class = 'loaded';
        $scope.ready = false;
        $scope.loading = true;


        //--------MATERIALIZE--------//
        $('.modal').modal();
        $timeout($('ul.tabs').tabs(), 0);
        $('select').material_select();

        //Init vars
        $scope.log = restService.models;
        console.log($scope.log);
        $scope.currentTabP = 'fp0';
        $scope.currentTab = 'ip0';
        $scope.currentModel = 0;
        $scope.fthreshold = 0.5;
        $scope.ithreshold = 0.5;
        $scope.prints = [];

        $scope.$watch('currentModel', function () {
            $timeout(function () {
                var graph = document.getElementsByTagName('svg')[$scope.currentModel];
                console.log(graph);
                //console.log($("svg")[0].attributes.width.nodeValue);
                if (graph.clientWidth > $("#graph-div").width()) {
                    graph.setAttribute("height", "100%");
                    graph.setAttribute("width", "100%");
                }
            }, 0);
        });

        //Gets log and models from server
        $scope.get = function () {

            restService.get(restService.url, "logs/", $scope.log)
                .then(function (response) {
                    $scope.log = response.data;
                    $scope.models = response.data.models;

                    //Convert fp and ip
                    $scope.graphs = [];

                    //Convert models to viz
                    for (var i = 0; i < $scope.models.length; i++) {

                        //Push values into array
                        $scope.graphs.push({
                            'graph': $sce.trustAsHtml(Viz($scope.models[i].model, 'svg'))
                        });
                    }

                    $scope.loading = false;

                    $timeout(function () {
                        var graph = document.getElementsByTagName('svg')[0];
                        //console.log($("svg")[0].attributes.width.nodeValue);
                        if (graph.clientWidth > $("#graph-div").width()) {
                            graph.setAttribute("height", "100%");
                            graph.setAttribute("width", "100%");
                        }
                    }, 0);

                    $timeout(function () {
                        $scope.class = "";
                        $scope.ready = true;
                    }, 2000);


                });
        };
        $scope.get();


        //Deletes a model
        $scope.deleteModel = function () {

            //Set vars
            var uploadUrl = restService.url + 'model' + "?file=";


            postService.postData(uploadUrl, $scope.log.name, $scope.currentModel)
                .then(function success(response) {
                    Materialize.toast('Model deleted correctly', 4000);

                    $scope.log = response.data;
                    $scope.models = response.data.models;


                    //Convert fp and ip
                    $scope.graphs = [];

                    //Convert models to viz
                    for (var i = 0; i < $scope.models.length; i++) {

                        var fp = [];
                        var ip = [];

                        var fpo = [];
                        var ipo = [];

                        fpo = $scope.models[i].fp;
                        ipo = $scope.models[i].ip;

                        if (fpo !== null) {
                            for (var j = 0; j < fpo.length; j++)
                                fp.push($sce.trustAsHtml(Viz(fpo[j], 'svg')));
                        }

                        if (ipo != null) {
                            for (var k = 0; k < ipo.length; k++)
                                ip.push($sce.trustAsHtml(Viz(ipo[k], 'svg')));
                        }


                        //Push values into array
                        $scope.graphs.push({
                            'graph': $sce.trustAsHtml(Viz($scope.models[i].model, 'svg')),
                            'fp': fp,
                            'ip': ip
                        });
                    }

                }, function error(response) {
                    swal('Error!', 'An error ocurred :(', 'error');

                }).finally(function () {

                if ($scope.models.length == 0) {
                    $location.path('/dashboard');
                }

            });
        };

        //Get activity statistics
        $scope.activityStats = function () {

            //Set vars
            var uploadUrl = restService.url + 'activityStats' + "?file=";

            $scope.sLoading = true;

            postService.postData(uploadUrl, $scope.log.name + $scope.currentModel)
                .then(function success(response) {

                    //Save stats
                    $scope.stats = response.data;
                    console.log($scope.stats);

                }, function error(response) {
                    swal('Error!', 'An error ocurred :(', 'error');

                }).finally(function () {
                $scope.sLoading = false;
            });
        };

        //Activity frequency heatmap
        $scope.actFrequencyHeatMap = function () {

            var stats = $scope.stats.activityRelativeFrequency;

            $scope.actmap = true;

            var max = stats[0]._2;
            var min = stats[stats.length - 1]._2;

            var chunksize = max / 4;
            $scope.chunksize = chunksize;

            console.log(max);
            console.log(chunksize);


            $scope.c1 = [];
            $scope.c2 = [];
            $scope.c3 = [];
            $scope.c4 = [];

            var i = 0;

            while (i < stats.length) {
                if (stats[i]._2 < chunksize) {
                    $scope.c1.push(stats[i]._1);
                } else if (stats[i]._2 >= chunksize && stats[i]._2 < chunksize * 2) {
                    $scope.c2.push(stats[i]._1);
                } else if (stats[i]._2 * 2 >= chunksize && stats[i]._2 < chunksize * 2) {
                    $scope.c3.push(stats[i]._1);
                } else if (stats[i]._2 * 3 >= chunksize && stats[i]._2 <= chunksize * 4) {
                    $scope.c4.push(stats[i]._1);
                }
                i++;
            }

            //Clear map
            $scope.clearGraph();

            //Color nodes
            $scope.colorNodes($scope.c1, "#fff3e0");
            $scope.colorNodes($scope.c2, "#ffcc80");
            $scope.colorNodes($scope.c3, "#fb8c00");
            $scope.colorNodes($scope.c4, "#ef6c00");

            $scope.caption = "Activity frequency heatmap."

            /*var graph = {
             graph: $sce.trustAsHtml($('svg')[0].innerHTML),
             print: document.getElementsByTagName('svg')[0],

             };
             $scope.prints.push(graph);*/


        };

        //Activity duration heatmap
        $scope.actDurationHeatMap = function () {

            var stats = $scope.stats.activityAverages;

            $scope.actmap = true;

            //console.log(stats[0]);

            var max = stats[0][1];
            var min = stats[stats.length - 1][1];

            var chunksize = max / 4;
            $scope.chunksize = chunksize;

            $scope.c1 = [];
            $scope.c2 = [];
            $scope.c3 = [];
            $scope.c4 = [];

            var i = 0;

            while (i < stats.length) {
                if (stats[i][1] < chunksize) {
                    $scope.c1.push(stats[i][0]);
                } else if (stats[i][1] >= chunksize && stats[i][1] < chunksize * 2) {
                    $scope.c2.push(stats[i][0]);
                } else if (stats[i][1] * 2 >= chunksize && stats[i][1] < chunksize * 2) {
                    $scope.c3.push(stats[i][0]);
                } else if (stats[i][1] * 3 >= chunksize && stats[i][1] <= chunksize * 4) {
                    $scope.c4.push(stats[i][0]);
                }
                i++;
            }

            //Clear map
            $scope.clearGraph();

            //Color nodes
            $scope.colorNodes($scope.c1, "#fff3e0");
            $scope.colorNodes($scope.c2, "#ffcc80");
            $scope.colorNodes($scope.c3, "#fb8c00");
            $scope.colorNodes($scope.c4, "#ef6c00");

            $scope.caption = "Activity duration heatmap.";

            /*var graph = {
             graph: $sce.trustAsHtml($('svg')[0].innerHTML),
             print: document.getElementsByTagName('svg')[0],
             caption: "Activity duration heatmap."
             };
             $scope.prints.push(graph);*/


        };

        //Get frequent patterns
        $scope.getFrequentPatterns = function () {

            $scope.showfp = true;
            $scope.fLoading = true;

            //Set vars
            var uploadUrl = restService.url + 'frequentPatterns'
                + "?file=" + $scope.log.name
                + "&data=" + $scope.currentModel
                + "&threshold=" + $scope.fthreshold;

            postService.get(uploadUrl)
                .then(function success(response) {

                    var fp = [];

                    $scope.ufp = response.data;

                    for (var k = 0; k < response.data.length; k++) {

                        response.data[k].graph = $sce.trustAsHtml(Viz(response.data[k].dot, 'svg'));

                        fp.push(
                            response.data[k]
                        );
                    }

                    $scope.fp = fp;

                    if (fp.length > 0) {
                        Materialize.toast('Frequent patterns found', 4000);
                    } else {
                        Materialize.toast('No patterns were found', 4000);
                    }

                    console.log($scope.fp)


                }, function error(response) {
                    swal('Error!', 'An error ocurred :(', 'error');

                }).finally(function () {
                $scope.fLoading = false;
                //$scope.get();
            });
        };

        //Get infrequent patterns
        $scope.getInfrequentPatterns = function () {

            $scope.showip = true;
            $scope.iLoading = true;

            //Set vars
            var uploadUrl = restService.url + 'infrequentPatterns'
                + "?file=" + $scope.log.name
                + "&data=" + $scope.currentModel
                + "&threshold=" + $scope.ithreshold;

            postService.get(uploadUrl)
                .then(function success(response) {

                    var ip = [];

                    $scope.uip = response.data;

                    for (var k = 0; k < response.data.length; k++) {

                        response.data[k].graph = $sce.trustAsHtml(Viz(response.data[k].dot, 'svg'));

                        ip.push(
                            response.data[k]
                        );
                    }

                    $scope.ip = ip;

                    if (ip.length > 0) {
                        Materialize.toast('Frequent patterns found', 4000);
                    } else {
                        Materialize.toast('No patterns were found', 4000);
                    }

                    console.log($scope.ip)


                }, function error(response) {
                    swal('Error!', 'An error ocurred :(', 'error');

                }).finally(function () {
                $scope.iLoading = false;
                //$scope.get();
            });
        };

        //Save a frequent pattern
        $scope.postFrequentPattern = function (pattern) {
            //Set vars
            var uploadUrl = restService.url + 'frequentPatterns' + "?file=";

            console.log($scope.fp[pattern]);

            postService.postPattern(uploadUrl, $scope.log.name, $scope.currentModel, $scope.fp[pattern])
                .then(function success(response) {

                        $scope.log = response.data;
                        $scope.models = response.data.models;

                        //Convert fp and ip
                        $scope.graphs = [];

                        //Convert models to viz
                        for (var i = 0; i < $scope.models.length; i++) {

                            var fp = [];
                            var ip = [];

                            var fpo = $scope.models[i].fp;
                            var ipo = $scope.models[i].ip;

                            if (fpo !== null) {
                                for (var j = 0; j < fpo.length; j++)
                                    fp.push($sce.trustAsHtml(Viz(fpo[j], 'svg')));
                            }

                            if (ipo != null) {
                                for (var k = 0; k < ipo.length; k++)
                                    ip.push($sce.trustAsHtml(Viz(ipo[k], 'svg')));
                            }


                            //Push values into array
                            $scope.graphs.push({
                                'graph': $sce.trustAsHtml(Viz($scope.models[i].model, 'svg')),
                                'fp': fp,
                                'ip': ip
                            });
                        }
                    },

                    function error(response) {
                        swal('Error!', 'An error ocurred :(', 'error');
                    }
                );
        };

        //Save an infrequent pattern
        $scope.postInfrequentPattern = function (pattern) {
            //Set vars
            var uploadUrl = restService.url + 'infrequentPatterns' + "?file=";

            postService.postPattern(uploadUrl, $scope.log.name, $scope.currentModel, $scope.uip[pattern].dot)
                .then(function success(response) {

                        $scope.log = response.data;
                        $scope.models = response.data.models;

                        //Convert fp and ip
                        $scope.graphs = [];

                        //Convert models to viz
                        for (var i = 0; i < $scope.models.length; i++) {

                            var fp = [];
                            var ip = [];

                            var fpo = $scope.models[i].fp;
                            var ipo = $scope.models[i].ip;

                            if (fpo !== null) {
                                for (var j = 0; j < fpo.length; j++)
                                    fp.push($sce.trustAsHtml(Viz(fpo[j], 'svg')));
                            }

                            if (ipo != null) {
                                for (var k = 0; k < ipo.length; k++)
                                    ip.push($sce.trustAsHtml(Viz(ipo[k], 'svg')));
                            }


                            //Push values into array
                            $scope.graphs.push({
                                'graph': $sce.trustAsHtml(Viz($scope.models[i].model, 'svg')),
                                'fp': fp,
                                'ip': ip
                            });
                        }
                    },

                    function error(response) {
                        swal('Error!', 'An error ocurred :(', 'error');
                    }
                );
        };

        //Get activity statistics
        $scope.arcStats = function () {

            $scope.aLoading = true;

            //Set vars
            var uploadUrl = restService.url + 'arcStats' + "?file=";

            postService.postData(uploadUrl, $scope.log.name, $scope.currentModel)
                .then(function success(response) {
                    $scope.aStats = response.data;
                    $scope.astats = true;

                    //Get min and max frequency
                    $scope.astatsMax = Math.max.apply(Math, $scope.aStats.map(function (o) {
                        return o.frequency;
                    }));

                    $scope.astatsMin = Math.min.apply(Math, $scope.aStats.map(function (o) {
                        return o.frequency;
                    }));

                }, function error(response) {
                    swal('Error!', 'An error ocurred :(', 'error');

                }).finally(function () {
                //$scope.get();
                $scope.aLoading = false;
            });
        };

        //Filter arcs by percentage
        $scope.filterArcs = function () {

            $scope.clearGraph();

            var arcs = [];

            $scope.aStats.forEach(function (arc) {
                if (arc.frequency < $scope.arcthreshold) {
                    arcs.push(arc);
                }
            });


            $scope.caption = "Model with arcs less than " + $scope.arcthreshold + " removed.";

            $scope.colorArcs(arcs, "transparent");

            /* var graph = {
             graph: $sce.trustAsHtml($('svg')[0].innerHTML),
             print: document.getElementsByTagName('svg')[0],
             caption: "Model with arcs less than " + $scope.arcthreshold + " removed."
             };
             $scope.prints.push(graph);*/

        };

        //Get trace
        $scope.getTrace = function (trace) {
            $scope.tLoading = true;

            //Set vars
            var uploadUrl = restService.url + 'traces'
                + "?file=" + $scope.log.name
                + "&data=" + $scope.currentModel
                + "&tracename=" + trace;


            postService.get(uploadUrl)
                .then(function success(response) {

                    $scope.trace = response.data;
                    console.log($scope.trace);


                }, function error(response) {
                    swal('Error!', 'An error ocurred :(', 'error');

                }).finally(function () {
                $scope.tLoading = false;
                $scope.clearGraph();
                $scope.colorNodes($scope.trace, "#b9f6ca");
                //$scope.get();

                $scope.caption = "Most frequent trace";

                /*var graph = {
                 graph: $sce.trustAsHtml($('svg')[0].innerHTML),
                 caption: "Most frequent trace."
                 };
                 $scope.prints.push(graph);*/

            });
        };

        //Get activity statistics
        $scope.getTraceStats = function () {

            $scope.tstats = true;


            //Set vars
            var uploadUrl = restService.url + 'traceStats' + "?file=";

            $scope.tLoading = true;

            postService.postData(uploadUrl, $scope.log.name + $scope.currentModel)
                .then(function success(response) {
                    //Materialize.toast('Activity statistics received: ' + $scope.File.name, 4000);
                    $scope.traceStats = response.data;
                    console.log($scope.traceStats);

                }, function error(response) {
                    swal('Error!', 'An error ocurred :(', 'error');

                }).finally(function () {
                //$scope.get();
                $scope.tLoading = false;
            });
        };

        //Generates report
        $scope.generateReport = function () {
            restService.graphs = $scope.prints;
            $location.path('/report');
        };

        //Save graph
        $scope.save = function () {
            var graph = {
                graph: $sce.trustAsHtml($('#graph')[0].innerHTML),
                print: document.getElementsByTagName('svg')[0],
                caption: $scope.caption
            };
            $scope.prints.push(graph);


            Materialize.toast("Graph added to report", 2000);
        };


        //---GRAPH FUNCTIONS---//
        $scope.map = function () {
            $scope.clearGraph();
        };
        $scope.clearGraph = function () {
            //Clear graph
            $(".graph g").each(function (i) {
                var $this = $(this);
                $this.children("polygon").attr("fill", "none");
                $this.children('polygon').attr('stroke', "black");
                $this.children('text').attr('font-size', '9.0');
                $(this).children('polygon').attr('opacity', 1);
                $(this).children('text').attr('opacity', 1);
            });

            $('g.edge').each(function (index) {
                $(this).children('path').attr('stroke', "black");
                $(this).children('polygon').attr('stroke', "black");
                $(this).children('path').attr('opacity', 1);
                $(this).children('polygon').attr('opacity', 1);
                $(this).children('polygon').attr('opacity', 1);
            });
        };
        $scope.colorNodes = function (nodes, color) {

            $('g.node').each(function (index) {
                var nodeName = $(this).children('title').text();

                if (nodes.indexOf(nodeName) !== -1) {
                    $(this).children('polygon').attr('fill', color);
                }
            });
        };

        $scope.colorArcs = function (nodes, color) {

            nodes.forEach(function (node) {

                $('g.edge').each(function (index) {

                    var nodeName = $(this).children('title').text();

                    var points = nodeName.split("->");

                    var a = node.activityA.split(":")[0];
                    var b = node.activityB.split(":")[0];

                    if (a == points[0] && b == points[1]) {
                        $(this).children('path').attr('stroke', color);
                        $(this).children('polygon').attr('stroke', color);
                        $(this).children('polygon').attr('fill', color);
                        //$scope.getGraphNode(a, color);
                        //$scope.getGraphNode(b, color);
                    }
                });
            });
        };

        $scope.getGraphNode = function (node, color) {

            $('g.node').each(function () {

                var nodeName = $(this).children('title').text();

                if (nodeName === node) {
                    console.log(nodeName);
                    $(this).children('polygon').attr('fill', color);
                    $(this).children('polygon').attr('stroke', color);
                    $(this).children('text').attr('font-size', '0');
                }
            });
        };

        $scope.colorPattern = function (p) {

            $scope.clearGraph();

            $scope.caption = "Pattern with frequency " + p.frequency;


            $('g.node').each(function (index) {
                var nodeName = $(this).children('title').text();

                if (p.nodes.split(',').indexOf(nodeName) == -1) {
                    $(this).children('polygon').attr('opacity', 0.2);
                    $(this).children('text').attr('opacity', 0.2);
                }
            });

            //$scope.colorArcs(p.arcs.split(","), "red");


            $('g.edge').each(function (index) {

                    var nodeName = $(this).children('title').text();

                    console.log($(this));


                    if (p.arcs.split(',').indexOf(nodeName) == -1) {

                        $(this).children('path').attr('opacity', 0.2);
                        $(this).children('polygon').attr('opacity', 0.2);
                        $(this).children('polygon').attr('opacity', 0.2);
                        //$scope.getGraphNode(a, color);
                        //$scope.getGraphNode(b, color);

                    } else {

                    }
                }
            );


        };


    }]);




