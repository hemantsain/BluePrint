import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  Linking,
  Platform,
} from 'react-native';
import { PropTypes } from 'prop-types';
import { fetchBitCoinData } from '../state/actions';
import { Styles } from '../styles';
import connect from 'react-redux/lib/connect/connect';

class Bitcoin extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  _onPress = () => {
    this.props.getBitCoinData(this.token);
  };

  _onChangeText = (text) => {
    this.token = text;
  };

  componentDidMount() {
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then((url) => {
        this.navigate(url);
      });
    } else {
      Linking.addEventListener('url', this.handleOpenURL);
    }
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL = (event) => {
    this.navigate(event.url);
  };

  navigate = (url) => {
    const route = url.replace(/.*?:\/\//g, '');
    const token = route.match(/\/([^\/]+)\/?$/)[1];

    this.props.getBitCoinData(token);
  };

  render() {
    const { bitcoinData, isLoading } = this.props;
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
            {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
          </View>
          {bitcoinData && (
            <View style={Styles.rowContainer}>
              <Text>Total received: {bitcoinData.total_received} BTC</Text>
              <Text>Total Sent: {bitcoinData.total_sent} BTC</Text>
              <Text>Current Balance: {bitcoinData.balance} BTC</Text>
              <Text>
                Unconfirmed Balance: {bitcoinData.unconfirmed_balance} BTC
              </Text>
              <Text>Final Balance: {bitcoinData.final_balance} BTC</Text>
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
    isLoading: state.bitCoinReducer.isLoading,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getBitCoinData: (value) => dispatch(fetchBitCoinData(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Bitcoin);
