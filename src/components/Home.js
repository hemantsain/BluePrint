import React, { Component } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { PropTypes } from 'prop-types';
import { fetchSearchList, fetchMoreList } from '../state/actions';
import { Styles } from '../styles';
import connect from 'react-redux/lib/connect/connect';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      data: this.props.listPostData,
    };
  }

  componentDidMount() {
    this.props.getListData(this.state.count);
    this._interval = setInterval(() => {
      this.setState({
        count: this.state.count + 1,
      });
      this.props.getMoreData(this.state.count);
    }, 50000);
  }

  callApi = () => {
    this.setState({
      count: this.state.count + 1,
    });
    this.props.getMoreData(this.state.count);
  };

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  renderItem = ({ item }) => (
    <View style={Styles.rowContainer}>
      <Text>Title: {item.title}</Text>
      <Text>Url: {item.url}</Text>
      <Text>Create At: {item.created_at}</Text>
      <Text>Author: {item.author}</Text>
    </View>
  );

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        searchIcon={false}
        clearIcon={false}
        onChangeText={(text) => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };

  searchFilterFunction = (text) => {
    this.setState({
      value: text,
    });
    const newData = this.props.listPostData.filter((item) => {
      const itemData = `${item.author.toLowerCase()}   
      ${item.created_at.toLowerCase()}`;

      const textData = text.toLowerCase();

      return itemData.indexOf(textData) > -1;
    });

    this.setState({ data: newData });
  };

  render() {
    return (
      <SafeAreaView style={Styles.appContainer}>
        <View style={Styles.container}>
          <Text>Count: {this.state.count}</Text>
          <FlatList
            data={this.props.listPostData}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={this.renderHeader}
            onEndReached={this.callApi}
          />
        </View>
      </SafeAreaView>
    );
  }
}

Home.propTypes = {
  getListData: PropTypes.func,
  getMoreData: PropTypes.func,
};
const mapStateToProps = (state) => {
  console.log('Home State', state);
  return {
    listPostData: state.appReducer.listData,
    isLoading: state.appReducer.isLoading,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getListData: (value) => dispatch(fetchSearchList(value)),
  getMoreData: (value) => dispatch(fetchMoreList(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
