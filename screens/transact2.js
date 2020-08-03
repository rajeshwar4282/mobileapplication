import  React from "react";
import { View, StyleSheet, Button,AsyncStorage, Alert,Text,Image,Modal } from "react-native";
import {firebase,db} from '../config/Firebase'
export default class transact2 extends React.Component {
 state={
     modalVisible:true,
     amount:'',
     amount1:''
 }
 
 componentDidMount  () {
    try{
       AsyncStorage.getItem('useruid').then((user1)=>{
        console.log(user1)
        this.setState({userId:user1});
        db.collection('vdc')
        .doc(this.state.userId)
        .get().then((doc)=>{
            if(doc.exists){
              this.setState({amount1:doc.data().amount}) 
            }
        })
        db.collection('notifications')
        .doc(this.state.userId)
        .get().then((doc1) => {
          if (doc1.exists) {
            this.setState({
             amount:doc1.data().amount
            })
          }})
            
     })
   
  }catch(error){
        alert(error)
      }
  } 
  pay=()=>{
      console.log(this.state.amount)
      console.log(this.state.amount1)

    if(this.state.amount > this.state.amount1){
       this.setState({modalVisible:false})
       this.props.navigation.navigate('vdc')
    }
    else{
        console.log('uefgiw')
       this.setState({modalVisible:false})
       this.props.navigation.navigate('Faceverify')
    }

}
decline=()=>{
    this.setState({modalVisible:false})
this.props.navigation.navigate('transact1')

}
render(){
    
  return (
    <View style={styles.container}>
        <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          
      <Text style={styles.paragraph}>Card Pay</Text>
      <Image style={{ height:150,width:150}} source={{uri:'https://i1.wp.com/leadingwithtrust.com/wp-content/uploads/2017/05/trustwortiness-icon.png?resize=300%2C300&ssl=1'}}/>
      <Text>this organization is not trustworthy</Text>
      <Text></Text>
<View style={{flexDirection:'row'}}>
<Button onPress={()=>this.pay()} title="Paynow"></Button>
<Text>   </Text>
<Button onPress={()=>this.decline()} title="Decline"></Button>    
</View>
      
          </View>
        </View>
      </Modal>
      <Text></Text>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  },
  centeredView: {
    flex: 1,
    height:150,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    
    backgroundColor: "white",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 30
  },
});