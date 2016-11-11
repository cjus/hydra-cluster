# ConStats

ConStats is a Node application which renders a text-based console displaying the status of the cluster.

* receives Hydra pubsub messages from instances of the [MachInfo](../machinfo/README.md) service running on each machine.
* uses the [Blessed](https://github.com/chjj/blessed) and [Blessed-contrib](https://github.com/yaronn/blessed-contrib) libraries to render its display.  
* reads serial data from USB port which is connected to the Arduino Mini Nano.
