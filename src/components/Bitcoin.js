import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput, Button } from 'react-native';
import { PropTypes } from 'prop-types';
import { fetchBitCoinData } from '../state/actions';
import { Styles } from '../styles';
import connect from 'react-redux/lib/connect/connect';

class Bitcoin extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  callApi = () => {
    this.setState({
      count: this.state.count + 1,
    });
    this.props.getMoreData(this.state.count);
  };

  _onPress = () => {
    console.log('Button Clicked');
  };

  _onChangeText = (text) => {
    console.log('Enter text ' + text);
  };

  render() {
    const { bitcoinData } = this.props;
    return (
      <SafeAreaView style={Styles.appContainer}>
        <View style={Styles.container}>
          <View style={Styles.headerContainer}>
            <Text>Enter Bitcoin address: </Text>
            <TextInput
              style={Styles.inputStyle}
              placeholder="Enter bitcoin address"
              onChangeText={this._onChangeText}
            />
            <Button title="Search" onPress={this._onPress} />
          </View>
          {bitcoinData && (
            <View style={Styles.rowContainer}>
              <Text>Total received: {bitcoinData.total_received}</Text>
              <Text>Total Sent: {bitcoinData.total_sent}</Text>
              <Text>Current Balance: {bitcoinData.balance}</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

Bitcoin.propTypes = {
  getBitCoinData: PropTypes.func,
};
const mapStateToProps = (state) => {
  return {
    bitcoinData: state.bitCoinReducer.bitCoinData,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getBitCoinData: (value) => dispatch(fetchBitCoinData(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Bitcoin);
