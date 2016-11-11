# IOTNode

IOTNode is a NodeJS based microservice which processes tasks sent to it via the [MCP](../mcp/README.md) web application.

IOTNode runs in NodeJS Cluster mode allowing it to run on each CPU core on a multi-core machine. This also allows us to control the number of cores used on machines which are performing other functions. For example, the machine running Redis is a four core machine and only two of the cores are used to run IOTNode instances, leaving the remaining two cores for use by Redis.
