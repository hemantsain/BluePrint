import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SearchBar, Overlay } from 'react-native-elements';
import { PropTypes } from 'prop-types';
import { fetchSearchList, fetchMoreList } from '../state/actions';
import { Styles } from '../styles';
import connect from 'react-redux/lib/connect/connect';

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      data: this.props.listPostData,
      isVisible: false,
    };
    this.selectedItem = {};
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

  _onPress = (item) => {
    this.selectedItem = item;
    this.setState({
      isVisible: true,
    });
  };

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this._onPress(item)}>
      <View style={Styles.rowContainer}>
        <Text>Title: {item.title}</Text>
        <Text>Url: {item.url}</Text>
        <Text>Create At: {item.created_at}</Text>
        <Text>Author: {item.author}</Text>
      </View>
    </TouchableOpacity>
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
            data={
              this.state.data && this.state.data.length > 0 ? this.state.data : this.props.listPostData
            }
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={this.renderHeader}
            onEndReached={this.callApi}
          />
          <Overlay
            isVisible={this.state.isVisible}
            onBackdropPress={() => this.setState({ isVisible: false })}>
            <View style={Styles.modalContainer}>
              <Text>Title: {this.selectedItem.title}</Text>
              <Text>Url: {this.selectedItem.url}</Text>
              <Text>Create At: {this.selectedItem.created_at}</Text>
              <Text>Author: {this.selectedItem.author}</Text>
            </View>
          </Overlay>
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
