# PatternMap.js
Documentation coming soon.

# Example:

<pre>var pmap = new PatternMap({
  "String:^hello":  "Hello Hello!",
  "String":         "A String",
  "Number:-&gt;10":    [function (x) { return x &gt; 10; }, "Greater than 10..."],
  "Number:-&gt;5":     [function (x) { return x &gt; 5; }, "Greater than 5..."],
  "Number":         "A Number...",
  "Array:-&gt;":       [function (a) { return a.length === 4; }, "Array of 4."],
  "Array:3":        "Array of 3.",
  "Array":          "Array."
});

pmap("Hello"); //-&gt; "Hello Hello!"
pmap("Foo"); //-&gt; "A String"
pmap(25); //-&gt; "Greater than 10..."
pmap(10); //-&gt; "Greater than 5..."
pmap(0); //-&gt; "A Number..."
pmap([]); //-&gt; "Array."
pmap([1, 2, 3]); //-&gt; "Array of 3."
pmap([1, 2, 3, 4]); //-&gt; "Array of 4."</pre>
