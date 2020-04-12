import { StyleSheet } from 'react-native';
import Colors from './Colors';

export default StyleSheet.create({
  appContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  inputStyle: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: Colors.black,
  },
  rowContainer: {
    flex: 1,
    width: '100%',
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
