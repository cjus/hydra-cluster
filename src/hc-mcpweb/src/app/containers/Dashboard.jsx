import {default as React, Component} from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PageHeader,Panel } from 'react-bootstrap';
import { setPageTitle } from 'actions/ui';
import { getHydraServicesStatus } from 'actions/hydra';
import MDPanel from 'components/MDPanel';
import GraphVis from 'components/GraphVis';

import 'css/containers/Dashboard';

const MONITOR_UPDATE_FREQUENCY = 2000; // IN MILLISECONDS

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.formatServiceInfo = this.formatServiceInfo.bind(this);
    this.state = {
      timerHandle: null
    };
  }

  componentWillMount() {
    let {setPageTitle, getHydraServicesStatus} = this.props;
    setPageTitle('Dashboard');
    getHydraServicesStatus();
  }

  componentWillUnmount() {
    let {timerHandle} = this.state;
    clearInterval(timerHandle);
  }

  componentDidMount() {
    let {getHydraServicesStatus} = this.props;
    let timerHandle = setInterval(() => {
      getHydraServicesStatus();
    }, MONITOR_UPDATE_FREQUENCY);
    this.setState({
      timerHandle
    });
  }

  formatServiceInfo(data) {
    data = Object.assign({
      memory: {
        heapTotal: 0,
        heapUsed: 0,
        rss: 0
      },
      uptime: '',
      architecture: '',
      nodeVersion: '',
      platform: '',
      log: []
    }, data);
    if (data.error !== undefined) {
      return '';
    }

    let markdownText = `
* IP address: ${data.ip}
* Port address: ${data.port}
* ProcessID: ${data.processID}
* Memory:
  * heapTotal: ${data.memory.heapTotal}
  * heapUsed: ${data.memory.heapUsed}
  * rss: ${data.memory.rss}
* Uptime: ${data.uptime}
---
* Architecture: ${data.architecture}
* Node version: ${data.nodeVersion}
* Platform: ${data.platform}
    `;
    return markdownText;
  }

  render() {
    let { services } = this.props;
    let nodeCount = 1;
    let graphData = {
      nodes: [],
      edges: []
    };

    if (services && services.result && services.error === undefined) {
      if (services.result.reason !== 'Unavailable hydra-router instances') {
        // Find HydraMCP
        services.result.map((service) => {
          if (service.serviceName === 'hydra-router') {
            graphData.nodes.push({
              id: nodeCount,
              label: 'router-service',
              color: '#00cc00',
              shape: 'dot'
            });
          }
        });

        services.result.map((service) => {
          if (service.serviceName !== 'hydra-router') {
            nodeCount += 1;
            graphData.nodes.push({
              id: nodeCount,
              label: service.serviceName,
              color: '#00cc00',
              shape: 'dot'
            });
            graphData.edges.push({
              from: 1,
              to: nodeCount
            });
          }
        });
      } else {
        services.result = [
          {
            error: services.result.reason
          }
        ]
      }
    }

    let hasErrors = (services && services.result && services.result.length > 0 && services.result[0].error !== undefined) ? true : false;

    return (
      <div className='dashboard'>
        <div className='dashboard__container'>
          <PageHeader className='dashboard__pageheader'>Dashboard<small> - view status of service instances</small></PageHeader>
          {!hasErrors && (
            <Panel className ='dashboard__services-graph' header='Services'>
              <GraphVis graph={graphData}/>
            </Panel>
          )}
          {hasErrors && (
            <div>Error: {services.result[0].error}</div>
          )}
          {!hasErrors && (
            <div className='dashboard__services-container'>
              {services && services.result.error === undefined && (
                services.result.map((service) => {
                  let mdText = this.formatServiceInfo(service);
                  let panelTitle = `Service: ${service.serviceName} (${service.instanceID.substring(0,6)})`;
                  return (
                    <div key={service.instanceID} className='dashboard__service-tile'>
                      <MDPanel src={mdText} title={panelTitle} />
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let services;
  if (state.hydra) {
    services = state.hydra.get('services');
  }

  return {
    services
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    push,
    setPageTitle,
    getHydraServicesStatus
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
