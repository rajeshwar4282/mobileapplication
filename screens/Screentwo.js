import React from 'react';
import { View, StyleSheet,Text } from 'react-native';
import ChatBot from 'react-native-chatbot'; 
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking'
const TabIcon = (props) => (
  <Ionicons
    name={'ios-chatboxes'}
    size={30}
    color= "#66b2ff"
  />
)
const steps = [
  {
    id: '0',
    message: 'welcome to cardpay assistant ',
    trigger: '0.5',
  },
  {
    id: '0.5',
    options:[ 
      {value:1,label:'Chat with Chatbot ',trigger:'1'},
      {value:2,label:' Interact with virtual agent  ',trigger:()=>{Linking.openURL('https://dd8d2479772d4d6ba8fffbf7abfd3618.eu-west-1.sumerian.aws/');
    }},
     

    ],  
  },
  
  {
    id: '1',
    options:[ 
      {value:1,label:'Want to know about CardPay? ',trigger:'2'},
      {value:2,label:' How to Use CardPay?  ',trigger:'3'},
      {value:3,label:' Why does CardPay lock the credit card?  ',trigger:'4'},
      {value:4,label:'What is Carding? ',trigger:'5'},
      {value:5,label:'What is VDC? ',trigger:'6'},
    ],  
  },
  {
    id:'2',
    options:[ 
      {value:1,label:'What is Card Pay? ', trigger:'9'},
      {value:2,label:' How CardPay ensures Safety  ',trigger:'10'},
      {value:3,label:' What is CardPay’s motto?  ',trigger:'11'},
    ],  
  },
  {
    id:'3',
    message:'Register yourself with necessary details like Credit card ,PAN card and Aadhar card. You will be Authorized before transactions ensuring safety. ',
   trigger:'7',
  },
  {
    id:'4',
    message:'Locking Ensures that your card is inactive for payments until you are authorized . This prevents carding Attacks.',
    trigger:'7',
  },
  {
    id:'6',
    message:'For Fraud prvention and you can unlock the card only if your face is recognized.',
    trigger:'7',
  }, 
  {
    id:'5',
    message:'VDC is Virtual Debit Card. We Use Virtual Debit cards to process transactions and lock your credit card.',
    trigger:'7',
  },
  {
    id:'5',
    message:'CARDING is a form of credit card fraud in which a stolen credit card is used.',
   trigger:'7',
  },
  {
    id:'9',
    message:'CardPay is a Mobile Application intended to Prevent Credit Card Frauds',
    trigger:'7',
  },
  {
    id:'10',
    message:'CardPay Uses Face Recognition , Device Verification to protect the Transaction.',
    trigger:'7',
  },
  {
    id:'11',
    message:' CardPay’s main aim is to prevent carding attacks',
    trigger:'7',
  },
  {
    id: '7',
    message: 'Want to Continue? ',
    trigger: '7.5',
  },

  {
    id: '7.5',
    options:[
      {value:1,label:'Yes ',trigger:'1'},
      {value:2,label:'No',trigger:'8'},
    ]  ,
  },
  {
    id:'8',
    message:'Happy to help!',
    end:true,
  },
];
console.warn = () => {};
export default class Screentwo extends React.Component{
  static navigationOptions = {
    tabBarIcon: TabIcon
  };
 
  render(){
  return(
    <View style={Styles.container}>
    <ChatBot steps={steps}/>
    </View>
  );

  }
}
const Styles=StyleSheet.create({
  container:{
   flex:1,
   marginTop:30
  }
})