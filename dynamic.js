(function () {
    // a dynamic programming solution
    // see http://www.algorithmist.com/index.php/Dynamic_Programming

    var DynamicMatch = {

        match : function (needle, haystack) {

            var y = 0, n = 0, ret, wild, map;

            map = DynamicMatch.map(needle, haystack);

            do {
                // success: we are at the end of both needle and haystack
                if( y == haystack.length && n == needle.length ) {
                    ret = true;
                }

                // wildcards are zero-width so only move the needle; bookmark for backtracking
                else if( needle[n] == "*" ){
                    wild = { y : y, n : n};
                    n++;
                }

                // fail: needle is longer than haystack
                else if( y == haystack.length ) {
                    ret = false;
                }

                // match: advance both needle and haystack
                else if( map[y] && map[y][n] ) {
                    y++;
                    n++;
                }

                // miss with backtrack: jump to last bookmark, but down the haystack one
                else if( wild ) {
                    y = wild.y + 1;
                    n = wild.n;
                }

                // miss with no backtrack: hard fail
                else {
                    ret = false;
                }
            }
            while( ret == null );

            return ret;
        },

        map : function (a, b) {
            var ai,
                bi = -1;

            var map = new Array(b.length);

            while(++bi < b.length ) {
                map[bi] = new Array(a.length);
                ai = -1;
                while(++ai < a.length ) {
                    map[bi][ai] =
                        (a[ai] == b[bi] || a[ai] == "." || a[ai] == "*")  ?  1 : 0
                }
            }
            return map;
        }
    };

    window.match = DynamicMatch.match

})();