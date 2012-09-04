
(function () {
    /**
     * @name match
     * @description a matching challenge response
     * @see http://codelikebozo.com/string-pattern-matching-welcome-to-dynamic-pr
     * @function
     * @param {String} needle A simple matching pattern.
     * @param {String} haystack The text to search within
     * @return {Boolean} True if the pattern was successfully matched.
     * @example
     * Examples:
     *      match("abcd", "abcd")  // true
     *      match("a.cd", "abcd")  // true
     *      match("a*d", "abcd")  // true
     *      match("a*.c", "abbbc")  // true
     *      match("*a.c", "babbabc")  // true
     *
     *      match("b", "abc")  // false
     *      match("a.d", "abcd")  // false
     *      match("abcd", "abcde")  // false
     *      match("abcd", "zabcd")  // false
     * @author Twitter: @gkindel
     * @see https://github.com/gkindel/Matching-Challenge
     */
    var Match = {
        match : function (needle, haystack) {
            Match.memoise = {};
            var ret = Match._match(needle, haystack);
            delete Match.memoise;
            return ret;
        },

        _match : function (pattern, str) {
            var key =  Match._hashKey(pattern, str);
            var cached = Match.memoise[key];
            if( cached != null )
                return cached;

            var i = 0, c, ret;
            while( ret == null && (c = pattern[i++]) ){
                if( c === "*" )
                    ret = Match._wildMatch(pattern.slice(i) , str );
                else if( str[0] && (str[0] == c || c == "."))
                    str = str.slice(1);
                else
                    ret = false;
            }

            if( ret == null )
                ret = (str.length == 0);

            return Match.memoise[key] = ret;
        },

        _wildMatch : function (pattern, str) {
            var key = Match._hashKey(pattern, str);
            if(  Match.memoise[key] != null )
                return  Match.memoise[key];

            var i = 0, s,
                ret = (pattern.length == 0);

            while( !ret && (s = str.slice(i++)) )
                if( Match._match(pattern, s) )
                    ret = true;

            return Match.memoise[key] = ret;
        },

        _hashKey : function (pattern, str){
            return encodeURI(pattern) + "/" + encodeURI(str);
        }
    };

    window.match = Match.match;
})();



