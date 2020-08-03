import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet,
    Dimensions,
    TextInput,
    ImageBackground,
    ScrollView,
    AsyncStorage,
    CheckBox,RefreshControl
} from 'react-native';
import Loading6 from './Loading6'
import firebase,{db} from '../config/Firebase'
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from 'react-native';
const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  };

const {height, width} = Dimensions.get('window');
const TabIcon = (props) =>(
    <MaterialCommunityIcons name="cards" size={30} color="#66b2ff" />
)
export default class Screenfive extends Component {
    static navigationOptions = {
        tabBarIcon: TabIcon
      };
    constructor(props) {
        super(props);
        this.state = {
            
            userId:'',
            cardnumber1: '',
            nameonthecard1: '',
            cvv1: '',
            amount:'',
            amount1:'',
            status:false,
            amt:'',
            isvdc:true,
            amt1:'',
            expirydate1: '',
            arrow:'------->>>>>>>>>>>>>-------',
            loading: false,
            isSelected:false,
        }
    }
    onRefresh = () => {
        db.collection('cards')
        .doc(this.state.userId)
        .get().then(doc => {
          if (doc.exists) {
            this.setState({
             amount:doc.data().amount
            })
          }})
            db.collection('vdc')
        .doc(this.state.userId)
        .get().then(doc => {
          if (doc.exists) {
            this.setState({
             cardnumber1:doc.data().cardnumber,
            nameonthecard1:doc.data().nameonthecard,
          expirydate1:doc.data().expirydate,
        cvv1:doc.data().cvv,
        amount1:doc.data().amount
            })
          }})
     
         
          wait(2000).then(() => this.setState({refreshing:false}));
      }
    updateInputVal = (val, prop) => {
      const state = this.state;
      state[prop] = val;
      this.setState(state);
    }
   addmoney = () =>{
       const amt1 = +this.state.amount1 + +this.state.amt;
       const amt2 = +this.state.amount - +this.state.amt;
       
       if(this.state.isSelected){
           if(this.state.amount >= this.state.amt)
           {
            
          db.collection('vdc')
          .doc(this.state.userId)
          .update({
              amount:amt1
          }).then(()=>{
              db.collection('cards')
              .doc(this.state.userId)
              .update({
                  amount:amt2
              }).then(()=>this.props.navigation.navigate('Faceverify '))
          })
        }
        else{
            alert('insufficient balance in your credit card')
        }
       }
       else{
           alert('please select a card')
       }
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
          db.collection('cards')
          .doc(this.state.userId)
          .get().then(doc => {
            if (doc.exists) {
              this.setState({
               amount:doc.data().amount
              })
            }})
            db.collection('notifications')
            .doc(this.state.userId)
            .get().then(doc => {
              if (doc.exists) {
                this.setState({
                 amount2:doc.data().amount
                })
              }})
             
       })
     const amt3= +this.state.amount2- +this.state.amount1;
     this.setState({amt:amt3})
    }catch(error){
          alert(error)
        }
    } 
    render() {
      if(this.state.isvdc){
        return (
      
            <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={()=>this.onRefresh()} />} >
                <Text></Text>  
                <Text></Text>
                <Loading6
                  loading={this.state.loading} />
                 
              <Text style={{ fontWeight:'bold',textAlign:'center'}}>YOUR VIRTUAL DEBIT CARD</Text>
              <ScrollView horizontal={true} style={{ height:280,backgroundColor:'#fff',marginBottom:30}}>
               <View style={styles.shadow}>
                   <ImageBackground style={styles.image} source={require('../images/card-front.png')}>
                   <Text></Text>
                    <View style={{flexDirection:'row-reverse',marginLeft:10}}>
                     <Text></Text>
                   </View>
                      
          <Text style={{  fontSize:28,color:'#606060',marginLeft:16,marginTop:100}}>{this.state.cardnumber1.replace(/(\d{4})/g, '$1 ').replace(/(^\s+|\s+$)/,' ')}</Text>
          <Text style={{ fontSize:16,color:'#606060',marginLeft:150}}>{this.state.expirydate1}</Text>
                       <View style={{flexDirection:'row'}}>
                       
                       <Text style={{ fontSize:18,color:'#606060',marginLeft:16,marginBottom:30}} >{this.state.nameonthecard1}</Text>
                       </View>
                   </ImageBackground>
               </View>
               <View style={styles.shadow}>
        
                      <ImageBackground style={styles.image} source={require('../images/card-back.png')}>
                     { this.state.status ? <Text style={{ fontSize:24,marginLeft:230,marginBottom:50}}>{this.state.cvv1}</Text> :<Text style={{ fontSize:24,fontWeight:'bold', marginLeft:230,marginBottom:50}}>.....</Text>}
                      </ImageBackground>
                  </View>
                  
                </ScrollView>
                <Text style={{textAlign:'center',fontSize:15}}>{this.state.arrow}</Text>
              {this.state.status ? <TouchableOpacity onPress={()=>{this.setState({status:false});}}><Text style={{textAlign:'center',fontSize:20,fontWeight:'bold', color:'blue'}}>hide cvv</Text></TouchableOpacity>:<TouchableOpacity onPress={()=>{this.setState({status:true});}}><Text style={{textAlign:'center',fontSize:20,fontWeight:'bold', color:'blue'}}>SHOW CVV</Text></TouchableOpacity>}
             <Text></Text>
          <Text style={{textAlign:'center'}}>YOUR BALANCE</Text>
          <Text style={{fontSize:24,fontWeight:'bold',textAlign:'center',color:'#66b2ff'}}><FontAwesome name="rupee" size={24} color="#66b2ff" /> {this.state.amount1}</Text>
          <Text style={{textAlign:'center'}}>YOUR PAYMENT AMOUNT</Text>
          <Text style={{fontSize:24,fontWeight:'bold',textAlign:'center',color:'#66b2ff'}}><FontAwesome name="rupee" size={24} color="#66b2ff" /> {this.state.amount2}</Text>
          
          <Text style={{ margin:30,fontSize:15}}>Add Money:</Text>
          <View style={{alignSelf:'center',borderBottomColor:'#66b2ff', flexDirection:'row',borderBottomWidth:1,width:300,justifyContent:'center',textAlign:'center'}}>
          <TextInput
                  style={styles.inputStyle}
                  placeholder="Enter Amount"
                  value={this.state.amt}
                  maxLength={6}
                  onChangeText={(val) => this.updateInputVal(val, 'amt')}
                />  
                
              
               </View>
               <Text></Text>
               <Text style={{ marginLeft:30,marginBottom:20, fontSize:15}}>From:</Text>
               <View style={{ flexDirection:'row',borderWidth:2,borderRadius:10, borderColor:'#606060',margin:30,marginTop:0, justifyContent:'center', height:50}}>
               <Text style={{fontSize:24,marginLeft:30,color:'#66b2ff',marginTop:4}}>**********</Text>
                <Text style={{fontSize:24,marginLeft:0,color:'#66b2ff'}}>{this.state.cardnumber1.slice(this.state.cardnumber1.length / 1.5,this.state.cardnumber1.length)}</Text>
                <CheckBox
                  value={this.state.isSelected}
                  onValueChange={(val) => this.updateInputVal(val, 'isSelected')}
                  style={styles.checkbox}
                />
               </View>
               <Button onPress={()=>this.addmoney()} title="Add Money"></Button>
              </ScrollView>
          );
      }
     else{
         return(
            <View style={{flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',}}>
        <Text>you have not added your credit card</Text>
        <Text>add your credit card , then your vdc will be generated</Text>
        
          </View>
         );
       
     }
  

     }
       
    }

const styles = StyleSheet.create({
    checkbox:{
      marginLeft:20,
      marginRight:20
      
    },
    container1: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: 35,
      alignItems: 'center',
      justifyContent: 'center'
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    inputStyle: {
        marginBottom:10,
      alignSelf: "center",
      borderColor: "#000"
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    button: {
      marginTop: 20,
    marginBottom: 15,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#66B2FF',
    borderColor: '#66B2FF',
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
    marginLeft:75
    },
    shadow: {
      shadowOffset: { width: 10, height: 15 },
      
      shadowOpacity: 1000,
      shadowRadius:20,
      elevation: 30,
      backgroundColor : "#0c56a6",
      width:340,
      height:230,
      borderRadius:20,
      marginLeft:10,
      marginTop:30

    },
    inputStyle1: {
      width: '100%',
      marginBottom: 15,
      paddingBottom: 15,
      alignSelf: "center",
      borderColor: "#ccc",
      borderBottomWidth: 1
    },
    loginText1: {
      color: '#3740FE',
      marginTop: 25,
      textAlign: 'center'
    },
    button1: {
      marginTop: 20,
    marginBottom: 15,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#66B2FF',
    borderColor: '#66B2FF',
    borderWidth: 1,
    borderRadius: 5,
    width: 200
    },
    buttonText1:{
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff'
    },
    container: {
        flex: 1,
        backgroundColor:'#fff'
      },
    image: {
      width:340,
      height:230,
      flex: 1,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      overflow: 'hidden',
     shadowOffset: {
	   width: 0,
	   height: 12,
     },
     shadowOpacity: 100,
     shadowRadius: 1000.00,
      elevation: 30,
      backgroundColor:'#000',
      justifyContent: "center"
    },
});
