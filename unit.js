
var MatchingUnit = function ( unit ){

    unit.test("group: /*c/", function () {
        var pattern = "*c";
        unit.forbid('""', match(pattern, "") );
        unit.assert('"c"', match(pattern, "c") );
        unit.forbid('"caa"', match(pattern, "caa") );
        unit.assert('"aac"', match(pattern, "aac") );
        unit.forbid('"aca"', match(pattern, "aca") );
    });
    unit.test("group: /c*/", function () {
        var pattern = "c*";
        unit.forbid('""', match(pattern, "") );
        unit.assert('"c"', match(pattern, "c") );
        unit.assert('"caa"', match(pattern, "caa") );
        unit.forbid('"aac"', match(pattern, "aac") );
        unit.forbid('"aca"', match(pattern, "aca") );
    });
    unit.test("group: /*c*/", function () {
        var pattern = "*c*";
        unit.forbid('""', match(pattern, "") );
        unit.assert('"c"', match(pattern, "c") );
        unit.assert('"caa"', match(pattern, "caa") );
        unit.forbid('"aaa"', match(pattern, "aaa") );
        unit.assert('"aac"', match(pattern, "aac") );
        unit.assert('"aca"', match(pattern, "aca") );
    });
    unit.test("group: /ab./", function () {
        var pattern = "ab.";
        unit.assert('"aba"', match(pattern, "aba") );
        unit.assert('"abc"', match(pattern, "abc") );
        unit.forbid('"abcc"', match(pattern, "abcc") );
        unit.forbid('"abab"', match(pattern, "abab") );
        unit.forbid('""', match(pattern, "") );
        unit.forbid('"a"', match(pattern, "a") );
        unit.forbid('"cb"', match(pattern, "cb") );
        unit.forbid('"ab"', match(pattern, "ab") );
        unit.forbid('"cabc"', match(pattern, "cabc") );
        unit.forbid('"cabcc"', match(pattern, "cabcc") );
    });

    unit.test("group: /.ab/", function () {
        unit.forbid('""', match(".ab", "") );
        unit.forbid('"a"', match(".ab", "a") );
        unit.forbid('"cb"', match(".ab", "cb") );
        unit.forbid('"ab"', match(".ab", "ab") );
        unit.assert('"cab"', match(".ab", "cab") );
        unit.forbid('"cabcc"', match(".ab", "cabcc") );
        unit.assert('"cab"', match(".ab", "cab") );
    });

    unit.test("group: /a*c/", function () {
        var pattern = "a*c";
        unit.assert('"abc"', match(pattern, "abc") );
        unit.assert('"abbc"', match(pattern, "abbc") );
        unit.forbid('"abbcb"', match(pattern, "abbcb") );
        unit.forbid('"babbcb"', match(pattern, "babbcb") );
        unit.forbid('"babb"', match(pattern, "babbcb") );
        unit.forbid('"abbb"', match(pattern, "babbcb") );
        unit.forbid('"bbbc"', match(pattern, "babbcb") );
    });

    unit.test("group: /.*c/", function () {
        var pattern = ".*c";
        unit.forbid('"c"', match(pattern, "c") );
        unit.forbid('"cb"', match(pattern, "cb") );
        unit.assert('"bc"', match(pattern, "bc") );
        unit.assert('"bbc"', match(pattern, "bbc") );
        unit.assert('"bbbc"', match(pattern, "bbbc") );
        unit.forbid('"bbbcb"', match(pattern, "bbbcb") );
    });

    unit.test("group: /a.*c/", function () {
        var pattern = "a.*c";
        unit.assert('"abc"', match(pattern, "abc") );
        unit.assert('"abdc"', match(pattern, "abdc") );
        unit.assert('"abbdc"', match(pattern, "abbdc") );
    });

    unit.test("group: /a.c*f/", function () {
        var pattern = "a.c*f";
        unit.assert('"abcf"', match(pattern, "abcf") );
        unit.assert('"abcdef"', match(pattern, "abcdef") );
        unit.assert('"azcrwgfdjkgfdkjhdfjkfhf"', match(pattern, "azcrwgfdjkgfdkjhdfjkfhf") );
        unit.forbid('"bbcdef"', match(pattern, "bbcdef") );
    });

    unit.test("group: /.a*.j*/", function () {
        var pattern = ".a*.j*";
        unit.assert('"cadeajmn"', match(pattern, "cadeajmn") );
    });

    unit.test("group: /*a.a/", function () {
        var pattern = "*a.a";
        unit.assert('"abcbccacaca"', match(pattern, "abcbccacaca") );
    });

    unit.test("group: /*a.a.*ca.ab*c.*/", function () {
        var pattern = "*a.a.*ca.ab*c.*";
        var test = "abcbccacacaacaaaaaacaadklfgjfdlkgjlkfdjgldfkgcjzxazaczcababslkgjssacacacaccaaccccacacacccnjfdiehrdgjrig"
        unit.assert('"'+test+'"', match(pattern, test) );
    });

    unit.test("group: /*a*b*c*d*e*f*/", function () {
        var pattern = "*a*b*c*d*e*f*";
        var test = "abcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcde"
        test += "abcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcde"
        unit.forbid("slow w/o memoise...", match(pattern, test) );
    });
};