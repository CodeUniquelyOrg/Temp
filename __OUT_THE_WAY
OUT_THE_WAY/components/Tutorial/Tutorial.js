import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import TextField from 'material-ui/TextField';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';

// HACKY WAY TO DO IT
import config from 'src/config';

// Obtained from config - for example 'http://localhost:4000;
// Obtained from config - for example 'http://localhost:4000;
const CLIENT_ROOT_URL = process.env.CLIENT_ROOT || `${config.server.protocol}://${config.server.host}:${config.server.port}${config.server.root}`;

//
// A contrived example using a transition between steps
//
class Tutorial extends React.Component {

  state = {
    loading: false,
    finished: false,
    stepIndex: 0,
  };

  dummyAsync = (cb) => {
    this.setState({ loading: true }, () => {
      this.asyncTimer = setTimeout(cb, 500);
    });
  };

  handleNext = () => {
    const { stepIndex } = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2,
      }));
    }
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex - 1,
      }));
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sagittis nunc est, id tincidunt
            acus laoreet accumsan. Aliquam quis massa molestie, suscipit arcu vitae, aliquam lacus. Aliquam
            justo justo, mollis in lectus id, porta auctor nisl. Morbi aliquam lorem leo, vitae consequat dui
            condimentum et. Phasellus et tristique urna, ac facilisis urna. Duis in dolor varius erat pulvinar
            vestibulum. Aliquam efficitur tellus nec tortor tempor elementum. Quisque sit amet nibh metus.
            Ut luctus, urna in finibus convallis, purus lectus rutrum quam, sit amet tempus elit diam in felis.
            Proin finibus rhoncus massa, sed faucibus dui ornare vitae.
          </p>
        );
      case 1:
        return (
          <div>
            <TextField style={{ marginTop: 0 }} floatingLabelText="Special titles are allowed" />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sagittis nunc est, id tincidunt
              acus laoreet accumsan. Aliquam quis massa molestie, suscipit arcu vitae, aliquam lacus. Aliquam
              justo justo, mollis in lectus id, porta auctor nisl. Morbi aliquam lorem leo, vitae consequat dui
              condimentum et. Phasellus et tristique urna, ac facilisis urna. Duis in dolor varius erat pulvinar
              vestibulum. Aliquam efficitur tellus nec tortor tempor elementum. Quisque sit amet nibh metus.
              Ut luctus, urna in finibus convallis, purus lectus rutrum quam, sit amet tempus elit diam in felis.
              Proin finibus rhoncus massa, sed faucibus dui ornare vitae.
            </p>
            <p>Something something whatever cool</p>
          </div>
        );
      case 2:
        return (
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sagittis nunc est, id tincidunt
            acus laoreet accumsan. Aliquam quis massa molestie, suscipit arcu vitae, aliquam lacus. Aliquam
            justo justo, mollis in lectus id, porta auctor nisl. Morbi aliquam lorem leo, vitae consequat dui
            condimentum et. Phasellus et tristique urna, ac facilisis urna. Duis in dolor varius erat pulvinar
            vestibulum. Aliquam efficitur tellus nec tortor tempor elementum. Quisque sit amet nibh metus.
            Ut luctus, urna in finibus convallis, purus lectus rutrum quam, sit amet tempus elit diam in felis.
            Proin finibus rhoncus massa, sed faucibus dui ornare vitae.
          </p>
        );
      default:
        return 'You\'re done, enjoy portal!';
    }
  }

  renderContent() {
    const { finished, stepIndex } = this.state;
    const contentStyle = { margin: '0 16px', overflow: 'hidden' };

    if (finished) {

      window.location.href = CLIENT_ROOT_URL + '/dashboard';

      // redux State to send you to 'dashboard'
      // return (
      //   <div style={contentStyle}>
      //     <p>
      //       <a
      //         href="#"
      //         onClick={(event) => {
      //           event.preventDefault();
      //           this.setState({ stepIndex: 0, finished: false });
      //         }}
      //       >
      //         Click here
      //       </a> to reset the example.
      //     </p>
      //   </div>
      // );
    }

    return (
      <div style={contentStyle}>
        <div>{this.getStepContent(stepIndex)}</div>
        <div style={{ marginTop: 24, marginBottom: 12 }}>
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            onTouchTap={this.handlePrev}
            style={{ marginRight: 12 }}
          />
          <RaisedButton
            label={stepIndex === 2 ? 'Finish' : 'Next'}
            primary={true}
            onTouchTap={this.handleNext}
          />
        </div>
      </div>
    );
  }

  render() {
    const { loading, stepIndex } = this.state;

    return (
      <div style={{ width: '100%', maxWidth: 920, margin: 'auto' }}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Lorem ipsum dolor sit amet</StepLabel>
          </Step>
          <Step>
            <StepLabel>Lorem ipsum dolor sit amet</StepLabel>
          </Step>
          <Step>
            <StepLabel>Lorem ipsum dolor sit amet</StepLabel>
          </Step>
        </Stepper>
        <ExpandTransition loading={loading} open={true}>
          {this.renderContent()}
        </ExpandTransition>
      </div>
    );
  }
}

export default Tutorial;