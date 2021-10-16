What ultimately gets exported in your application is module.exports. "exports" is set
up as a global reference to module.exports, which initially is defined as an empty
object that you can add properties to. exports.myFunc is shorthand for
module.exports.myFunc.
As a result, if exports is set to anything else, it breaks the reference between
module.exports and exports

ATTENTION: Modules are cached globally in Node, so
if we have another file that also requires config.json and we modify it, it’s modified
everywhere that module is used in our application. Better require it,
and work locally with config object.

At the beginning there is an empty object {}
module.exports pointing on it -------> {}
exports - is a copy of link on it too /

BUT only module.exports link will be exported.
When we do exports = {bla bla} - we change reference to this object, and won't export nothing.
When we do module.exports = {bla bla} - we change a link from one object to another, and it node
export it

module.exports = exports -> mostly done if you've already set exports reference to whole new object, and don't want to
change it, you can set module.exports link to the exports object. But better refactor it and set everything to
module.exports and don't f*ck around like a child.

-----------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------
In the Node.js module system, each file is treated as a separate module.
require.main
The Module object representing the entry script loaded when the Node.js process launched

The module.exports property can be assigned a new value (such as a function or object)
When a file is run directly from Node.js, require.main is set to its module.
So if "$>node foo.js" - require.main === module of foo.js. If "require('foo.js')" require.main !== module of foo.js.
To get the exact filename that will be loaded when require() is called, use the require.resolve() function.
const moduleFilePath = require.resolve('./module1'); moduleFilePath === your_path/module1_path/index.js

Modules are cached after the first time they are loaded. This means that every call to require('foo') will get
exactly the same object returned, if it would resolve to the same file.

FILE MODULES
If the exact filename is not found, then Node.js will attempt to load the required filename with the added extensions:
.js, .json, and finally .node.

.js files are interpreted as JavaScript text files
.json files are parsed as JSON text files.
.node files are interpreted as compiled addon modules loaded with process.dlopen().
Without a leading '/', './', or '../' to indicate a file, the module must either be a core module or is loaded from
a node_modules folder.

FOLDERS AS MODULES
It is convenient to organize programs and libraries into self-contained directories.
There are three ways in which a folder may be passed to require() as an argument.

1. The first is to create a package.json file in the root of the folder, which specifies a main module.
An example package.json file might look like this:
{
"name" : "some-library",
"main" : "./lib/some-library.js"
}
This in a folder at ./some-library, require('./some-library') would attempt to load ./some-library/lib/some-library.js.
IF THERE NO package.json file in the above example, then require('./some-library') would attempt to load:
./some-library/index.js
./some-library/index.node

LOADING FROM NODE_MODULES FOLDERS
If the module identifier passed to require() is not a core module, and does not begin with '/', '../', or './',
then Node.js starts at the parent directory of the current module, and adds /node_modules.
If it is not found there, then it moves to the parent directory, and so on,
until the root project directory with package.json is reached.

For example, if the file at 'some_path/my_module/ry/projects/foo.js' called require('bar.js'),
then Node.js would look in the following locations, in this order:

some_path/my_module/ry/projects/node_modules/bar.js
some_path/my_module/ry/node_modules/bar.js
some_path/my_module/node_modules/bar.js
some_path/node_modules/bar.js

LOADING FROM THE GLOBAL FOLDERS
Searching depend on $NODE_PATH env variable
Additionally, Node.js will search in the following list of GLOBAL_FOLDERS:
1: $HOME/.node_modules
2: $HOME/.node_libraries
3: $PREFIX/lib/node

THE MODULE WRAPPER
Before a module's code is executed, Node.js will wrap it with a function wrapper that looks like the following
(function(exports, require, module, __filename, __dirname) {
// Module code actually lives in here
});

MODULE
A reference to the current module. In each module, the module free variable is a reference to the object representing
the current module, module is not actually a global but rather local to each module.

REQUIRE(ID)
Used to import modules, JSON, and local files.
When Node invokes require() function with a local file path as the function’s only argument,
Node goes through the following sequence of steps:

Resolving: To find the absolute path of the file.
Loading: To determine the type of the file content.
Wrapping: To give the file its private scope. This is what makes require and module objects local to every file.
Evaluating: This is what the VM eventually does with the loaded code.
Caching: So that when we require this file again, we don’t go over all the steps another time.

Module._load = function(request, parent, isMain) {
  // 1. Check Module._cache for the cached module.
  // 2. Create a new Module instance if cache is empty.
  // 3. Save it to the cache.
  // 4. Call module.load() with your the given filename.
  //    This will call module.compile() after reading the file contents.
  // 5. If there was an error loading/parsing the file,
  //    delete the bad module from the cache
  // 6. return module.exports object from the file module
};

Module.prototype._compile = function(content, filename) {
  // 1. Create the standalone require function that calls module.require.
  // 2. Attach other helper methods to require. (resolve, main, resolve, cache, extensions)
  // 3. Wraps the JS code in a function that provides our require,
  //    module, etc. variables locally to the module scope.
  // 4. Run that function
};
The module._compile method is only used for running JavaScript files.
JSON files are simply parsed and returned via JSON.parse()

require(): Loads an external module
require.resolve(): Resolves a module name to its absolute path
require.main: The main module
require.cache: All cached modules
require.extensions: Available compilation methods for each valid file type, based on its extension

### Some interesting info about modules

From 16th node, we have ability to load modules via prefixes. e.g.
```js
const events = require('node:events') /* this ensures that package comes from native node guts, not from node_modules */
const promises = require('fs/promises') /* destruction not needed no more */
```

require.cache - is just an object of loaded modules with keys - their full path. Native modules are not there.
If you need to load new instance of your module - you can delete previous one from cache and that's it.

You should always remember that once required module is in cache, any link data type there only once created for whole
run, means basically you don't need a singleton pattern in JS. Someone also can mess around with native modules, patching
them in some package, and if you use native modules in regular way - you can use not native code.

You cannot use __filename or require in .mjs files with ES modules, but you can get same info from import.meta object.
If you need to use common modules in ES modules files - it's possible. Also possible to download modules from the network
avoiding the npm registry with your custom module loader.
