import React, { Component } from 'react';
import PropTypes from 'react-proptypes';

import { List, ListItem, makeSelectable } from 'material-ui/List';
// import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';

//

import style from './style.pcss';

// Make the list selectable
let SelectableList = makeSelectable(List);

// HOC - Wrapper Function
function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.number.isRequired,
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index,
      });
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

// Now Wrap the SelectableList in the HOC
SelectableList = wrapState(SelectableList);

// THE Questions we want to ask
const questions = [
  {
    question: 'What ...',
    answer: 'Lorem ipsum dolor sit amet, tritani adipisci tractatos ne mea. In cum primis nemore facilisis, dicat laudem menandri at per. Malorum debitis ut vel. Ut nam exerci veritus, ad pri dolor consequuntur. Pro graeci phaedrum te, eum nobis probatus reprehendunt ex. Cu minim meliore voluptua pro, eos id solum graece sapientem.',
  },

  {
    question: 'How do I ...',
    answer: 'Tritani fierent omnesque an pri, duo ad aeterno minimum sapientem, vis quot omittam legendos cu. Magna scaevola id vel. Ne homero perpetua eos. Per prompta feugait mnesarchum cu, sit ea laudem soluta philosophia, odio liber appetere eum ea. In ius clita dictas discere, sint dicant ut vis.',
  },

  {
    question: 'If I ...',
    answer: 'Augue doctus mea an. Alia lorem adolescens eu ius, quaeque facilisis te pro. Tation convenire quaerendum eam ut. Tale iudicabit te eos, sit ad gloriatur intellegam, et quot case mel. At meliore offendit dignissim usu, cu probo soleat pro.',
  },

  {
    question: 'What ...',
    answer: 'Lorem ipsum dolor sit amet, tritani adipisci tractatos ne mea. In cum primis nemore facilisis, dicat laudem menandri at per. Malorum debitis ut vel. Ut nam exerci veritus, ad pri dolor consequuntur. Pro graeci phaedrum te, eum nobis probatus reprehendunt ex. Cu minim meliore voluptua pro, eos id solum graece sapientem.',
  },

  {
    question: 'What ...',
    answer: 'Lorem ipsum dolor sit amet, tritani adipisci tractatos ne mea. In cum primis nemore facilisis, dicat laudem menandri at per. Malorum debitis ut vel. Ut nam exerci veritus, ad pri dolor consequuntur. Pro graeci phaedrum te, eum nobis probatus reprehendunt ex. Cu minim meliore voluptua pro, eos id solum graece sapientem.',
  },

  {
    question: 'How do I ...',
    answer: 'Tritani fierent omnesque an pri, duo ad aeterno minimum sapientem, vis quot omittam legendos cu. Magna scaevola id vel. Ne homero perpetua eos. Per prompta feugait mnesarchum cu, sit ea laudem soluta philosophia, odio liber appetere eum ea. In ius clita dictas discere, sint dicant ut vis.',
  },

  {
    question: 'If I ...',
    answer: 'Augue doctus mea an. Alia lorem adolescens eu ius, quaeque facilisis te pro. Tation convenire quaerendum eam ut. Tale iudicabit te eos, sit ad gloriatur intellegam, et quot case mel. At meliore offendit dignissim usu, cu probo soleat pro.',
  },
];

const renderList =  () => {
  return questions.map( (q,i) => {
    return (
      <ListItem
        value={i*2}
        primaryText={q.question}
        nestedItems={[
          <ListItem
            value={i*2+1}
            primaryText="Answer:"
            secondaryText={q.answer}
          />,
        ]}
      />
    );
  });
};

// Only needs to be Functional - Read Only
const FAQ = () => (
  <SelectableList defaultValue={1}>
    <Subheader>Frequently Asked Questions</Subheader>
    {renderList()}
  </SelectableList>
);

/*
class FAQ extends Component {

  static propTypes = {

    // A 'vehicle' registration record
    vehicle: PropTypes.shape({
      plate: PropTypes.string.isRequired,
      // fromDate: PropTypes.instanceOf(Date).isRequired,
      fromDate: PropTypes.string.isRequired,
      ideal: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          pressure: PropTypes.number.isRequired,
        }),
      ),
    }),

    // The tyre data we pass in has this shape
    tyres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        pressure: PropTypes.number.isRequired,
        depth: PropTypes.number.isRequired,
      }),
    ).isRequired,

    // May be in users prefereneces - optional
    units: PropTypes.shape({
      pressure: PropTypes.string.isRequired,
      depth: PropTypes.string.isRequired,
    }),

    // what percentage is allowed on pressure
    tolerence: PropTypes.number,

    // expansion - allow car color to be changed ???
    colour: PropTypes.string,

    // PCSS Object, similar code style as react toolbox allowing
    // for Tyre color overrides and size overrides
    theme: PropTypes.object,
  }

  static defaultProps = {
    units: {
      pressure: 'PSI',
      depth: 'mm',
    },
    tolerence: 0.2,  // 20%
    colour: 'blue',
  }

  render() {

    const {
      vehicle,
      // tyres,
      units,
      tolerence,
      ...rest,
    } = this.props;

    if ( vehicle ) {
      const tyres = this.renderTyres();

      //
      // [     image
      //
      //   [  Axel  1  ]
      //   [  Axel ... ]
      //   [  Axel  n  ]
      //
      //                 ]
      //

      return (
        <div className={style.root}>

          <div className={style.plate}>
            <Plate registration={vehicle.plate} isYellow={true} />
          </div>

          <div className={style.car}>
            <img src={car} />
            {tyres}
          </div>

        </div>
      );
    }

    return null;
  }
}
*/

export default FAQ;
