/**
* @name GraphVis
* @description An ES6 port of React-Graph-Vis. This is essentially a ReactJS wrapper over visjs.org
* @see https://github.com/cjus/react-graph-vis
*/
import {default as React, Component} from 'react';
const vis = require('vis');
const uuid = require('uuid');

class GraphVis extends Component {
  static defaultProps = {
    graph: {},
    identifier: uuid.v4(),
    style: {width: '100%', height: '100%'}
  }

  constructor(props) {
    super(props);
    this._graph = null;
    this.options = {
      stabilize: false,
      smoothCurves: true,
      edges: {
        color: '#666666',
        width: 0.5,
        arrowScaleFactor: 0.5,
        style: 'arrow'
      }
    };

    this.updateGraph = this.updateGraph.bind(this);
    this.state = {
      hierarchicalLayout: true
    };
  }

  componentDidMount() {
    this.updateGraph();
  }

  componentDidUpdate() {
    this.updateGraph();
  }

  changeMode(event) {
    this.setState({hierarchicalLayout: !this.state.hierarchicalLayout});
    this.updateGraph();
  }

  updateGraph() {
    let {identifier} = this.props;
    let container = document.getElementById(identifier);

    if (this.state.hierarchicalLayout) {
      this.options.hierarchicalLayout = {
        enabled: true,
        direction: 'UD',
        levelSeparation: 100,
        nodeSpacing: 1
      };
    } else {
      this.options.hierarchicalLayout = {
        enabled: false
      };
    }

    let graphData;
    if (typeof this.props.graph === 'object') {
      graphData = this.props.graph;
    } else {
      let parsedData = vis.network.dotparser.parseDOT(this.props.graph);
      this.options = Object.assign(this.options, parsedData.options);
      graphData = {
        nodes: parsedData.nodes,
        edges: parsedData.edges
      };
    }
    this._graph = new vis.Network(container, graphData, this.options);
  }

  render() {
    return (
      <div id={this.props.identifier} onDoubleClick={this.changeMode.bind(this)} style={this.props.style} />
    );
  }
}

module.exports = GraphVis;
