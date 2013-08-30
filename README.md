Matching-Challenge
==================

Exercise in response to an open dynamic programming string matching challenge:


#### Recursive solution 
http://gkindel.github.io/Matching-Challenge/recursive.html

####  Dynamic solution
http://gkindel.github.io/Matching-Challenge/dynamic.html


#### Test Source
http://gkindel.github.io/Matching-Challenge/unit.js

#### Original Challenge jcbozonier (@databozo)[https://twitter.com/databozo]

Links:

Updated Link: http://www.databozo.com/2009/05/19/string-pattern-matching-welcome-to-dynamic-pr.html
Original Link (broken): http://codelikebozo.com/string-pattern-matching-welcome-to-dynamic-pr


<p>The Challenge</p>

<p>So here&#8217;s the puzzle you&#8217;re provided: Given a string pattern tell if another given string matches the pattern. The character &#8221;.&#8221; is a wild card that can only match one character and a &#8221;<em>&#8221; is a wild card that can match as many characters as possible. Nothing matches a missing character.</em></p>

<p>For the pattern &#8220;a.c<em>f&#8221;, for example, &#8220;abcdef&#8221; would match as would &#8220;azcrwgfdjkgfdkjhdfjkfhf&#8221; but &#8220;bbcdef&#8221; would not.</em></p>

<p>How would you go about solving this problem? When I first set out to solve this problem I got horribly stuck. I tried to use just a for loop and then got totally lost in that the possible permutations branched all over the place. It seemed nigh intractable (for me of course since I knew this was solvable since regex does even more coolness than this).</p>

<p>Side note: That is a great way to tell what computer science challenges deserve your attention most. If you literally can&#8217;t even come close to tackling a problem understanding how to finally conquer it will make you a better developer by an order of magnitude each problem IMO.</p>

<p>Think about this for a bit cuz up next is the solution.</p>

<p>A Speedy Savior</p>

<p>So first off, one solution would be to create a string for every possible permutation of the pattern (up to the test string&#8217;s length) and check if one of those patterns matches your test string. There are two issues with this approach: A) It takes up a lot of space and B) it would take a LOT of time.</p>

<p>To prove it would take a lot of time consider that our solution would essentially need to consider every letter in the place of the wild card. That&#8217;s 26 additional runs PER single wild card&#8230; in the case of the asterisk that could be 26^N where N is the number of letters your wild card might take up. In the larger example above, with that technique, there&#8217;d be at least 766,467,265,200,361,890,474,622,976 permutations just to the wild card alone.</p>

<p>Thankfully as it turns out there&#8217;s a better way: Dynamic programming! Ok so what is dynamic programming and why does it apply here? Basically, dynamic programming can be helpful whenever you have a problem that breaks down into individual subproblems that can be combined together to form a complete answer. Once you&#8217;ve solved all of the individual subproblems you start from the finishing line and make your program assume that you found your optimal solution and try to work out what the previous step must&#8217;ve been given that the current step is optimal. </p>

<p>What some of you might be thinking is&#8230; what if my string doesn&#8217;t match? Assuming correctness seems wrong in that case huh? You definitely don&#8217;t want to return a false positive but that won&#8217;t happen. What will happen is that if you&#8217;re program isn&#8217;t able to match the strings, then the algorithm will be left incomplete and will never reach the block of code that says to return true. Essentially we only say there is a match if the algorithm starts at our finish line and ends up at the starting line we specify. If that path is broken, then our algorithm will return false.</p>

<p>Another benefit of this method is that the worst case runtime is O(mn) or for you non-computer science types, the number of steps the algorithm will take is approximately equal to the length of the pattern string multiplied by the length of the test string (the string we&#8217;re matching against). In our large sample above that would be about 115 steps to figure out the solution (at the worst)!</p>

<p>Forming a Recurring Subsequence Problem</p>

<p>This is really the hardest part. You need to think about the problem from several different angles until you can see it as a sum of several smaller problems. Once you see this subsolution though the programming just pops out at you.</p>

<p>In our example with the strings, I had been thinking about how I could break this up for the better of the day in the back of head during idle cycles. Finally when I sat down to draw out some ideas (I&#8217;m very visual) I realized that I could create a table with the pattern string forming the columns and the test string forming the rows. Once that was done I marked the cells that matched with a T (for True) and an F if they didn&#8217;t. I saw that in cases where I expected a match, I could traverse the table from the upper left corner to the lower right by traversing cells diagonally (or vertically in the case of an asterisk or a period).</p>

<p>I know this is hard to visualize so I&#8217;m going to <em>try</em> to give a visual here&#8230; bare with me.  :)</p>

<p>1 is True and 0 is False BTW&#8230;</p>

<p>Pattern: &#8220;.a<em>.j</em>&#8221;</p>

<p>Test string: &#8220;cadeajmn&#8221;</p>

<p>.a<em>.j</em></p>

<p>c101101</p>

<p>a111101</p>

<p>d101101</p>

<p>e101101</p>

<p>a101101</p>

<p>j101111</p>

<p>m101101</p>

<p>n101101</p>

<p>That is the test that made me have my &#8220;a-ha&#8221; moment. So now looking at this primitative visualization let&#8217;s see how our pattern matching rules show up here. First notice that the asterisks and periods have their entire columns set to true. The reason for this is that they can stand in for any letter so given appropriate positioning they <strong>could</strong> be true in any of those instances. I got a little tripped up here. I thought that this matrix should represent the fact that my period can only represent one letter but that turned out to be unnecessarily complicated during this phase. The 2nd phase, as you&#8217;ll see, makes that much easier.</p>

<p>From here see if you can start at the finish line though and work your way back to the start. Now while it <em>is</em> possible in this table that you could move from cell to cell horizontally, our phase 2 rules won&#8217;t allow for this. If we did allow this that would mean that two pattern characters could match to one test character and hopefully you can see why that makes no sense in our scenario. Also remember that you can only traverse cells vertically if you&#8217;re in an asterisk column (since that means that that single pattern character matched multiple test strings and that&#8217;s the only pattern character capable of doing that by definition).</p>

<p>Note that we know if our traversal was successful because at some point, on some path, we will arrive at cell (0,0). If we miss the starting line and go off the table, then we don&#8217;t have a match.</p>

<p>These last two paragraphs we&#8217;ve basically listed out the rules for our recursive algorithm. More clearly, they are as follows:</p>

<p>Given a cell (i, j) where i is the column, j is the row</p>

<ul>
<li>if we reach cell (0,0) AND this cell&#8217;s value is true we have a match - if we reach a cell where either i or j are negative we have no match (for this path, regardless of the value) - if none of the above but the current cell is true then test cell (i-1,j-1) (the cell to the upper left) -   if that doesn&#8217;t have a complete path and we are in an asterisk column try the row above</li>
</ul>

<p>Here are those same rules but in code:</p>

<p>private static bool <em>HasCompletePath(IList&#60;List&#60;bool&#187; matrix, int patternIndex, int stringIndex, string pattern){    var result = false;     if(patternIndex &#60; 0 || stringIndex &#60; 0)        return false;     if (patternIndex == 0 &amp;&amp; stringIndex == 0 &amp;&amp; matrix<span>patternIndex</span>)    {        result = true;    }    else if(matrix<span>patternIndex</span>)    {        var tempResult =</em>HasCompletePath(matrix, patternIndex - 1, stringIndex - 1, pattern);        if(!tempResult &amp;&amp; <em>HasCompletePath(matrix, patternIndex, stringIndex-1, pattern) &amp;&amp; pattern<span>patternIndex</span> == &#8217;<em>&#8217;)        {            tempResult = true;        }        result |= tempResult;    }     return result;}</em></em></p>

<p>Wrapping up</p>

<p>I don&#8217;t expect this to make perfect sense to someone who has never written a dynamic programming algorithm in their life. My main hope is that by me sharing the insights I gained while I&#8217;m still new to this that this will help others to learn this stuff a little easier. If nothing else, it should at least provide a new non-formalized non-mathematical perspective (which is REALLY difficult to find on the web).</p>

<p>Full source code is available here: <a href='http://github.com/jcbozonier/Dynamic-Programming-Sample/tree/master'>http://github.com/jcbozonier/Dynamic-Programming-Sample/tree/master</a>  </p>