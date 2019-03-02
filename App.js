import React, {Component} from 'react';
import {Platform, StyleSheet, Text,Button, View,TouchableHighlight,TouchableOpacity,TouchableWithoutFeedback,FlatList,ImageBackground} from 'react-native';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import ListPopover from 'react-native-list-popover';

import DropdownMenu from 'react-native-dropdown-menu';

import img from './b.jpg';

import { Dropdown } from 'react-native-material-dropdown';

import CardView from 'react-native-cardview'




export default class App extends Component {

  constructor(props){
    super(props);
    this.cityn='';
    this.catname='';
    this.i='';
    this.k='';
    this.itemh=[],
    this.state={
      showSections: false,
      listshow:false,
      showCat:false,
      data:[],
      list:[], 
    };
  }
  componentDidMount() {
    fetch('https://4r5qkqzk35.execute-api.us-east-1.amazonaws.com/v1/activecities/')
    .then(res=> res.json())
    .then(res=> {
       this.setState({
         data:res
       })     
      })
  }

  listdata = () =>{
    fetch('https://4r5qkqzk35.execute-api.us-east-1.amazonaws.com/v1/activecities/Tadepalligudem/Health/Hospitals/entry')
    .then(res => res.json())
    .then(res => {
      this.setState({
        list:res
      })
    })
  }
  
   city =(item,index) =>{
     
    this.cityn=item.city;
    
    this.setState({showCat:true});
   }

   cat=(item,index)=>{
     this.catname=item.category;
     this.setState({showSections:true});
   }
   
  render()
   {
    return (
     
 <View>
<ImageBackground style={{height: 200,justifyContent:"center",alignItems:"center" }} source={img}><Text style={{color:"white",fontSize:40}}>Glarimy Cities</Text></ImageBackground>
     
<View style={{height:80,padding:10  }}>
<FlatList
  horizontal
  data={this.state.data}
  renderItem={({item},index) =>{
  
     if(item.category === "Default")
     {
      return <View style={{backgroundColor:"#696969",height:70,width:500}}>
      <TouchableOpacity 
      onPress={()=>this.city(item,index)}>
     <CardView
         cardElevation={2}
         cardMaxElevation={2}
         cornerRadius={5}>
        <Text style={{fontSize:24,marginLeft:170,padding:20}}>{item.citydisplay}</Text>
        <Text>{item.citydisplay}</Text>
     
          </CardView>
          </TouchableOpacity>
   </View>
     }
  }
     }
  />
   </View> 

   
   {(this.state.showCat) &&  <FlatList
  horizontal
  data={this.state.data}
  renderItem={({item},index) =>{

    if(item.city === this.cityn && item.category != "Default" )
    { 
      
      return <View style={{padding:10,flex:1}}>
      <TouchableOpacity 
      onPress={()=>this.cat(item,index)}>
     <CardView
         cardElevation={2}
         cardMaxElevation={2}
         height={50}
         cornerRadius={5}>
        <Text style={{fontSize:18,padding:15}}>{item.categorydisplay}</Text>
          </CardView>
          </TouchableOpacity>
   </View>
        

      
    }
  }

}
  />}


{(this.state.showSections) &&  <FlatList
  horizontal
  data={this.state.data}
  renderItem={({item},index) =>{

    if(item.category === this.catname  )
    {
      
      return <View style={{padding:10,flex:1}}>
      <TouchableOpacity 
      onPress={()=>{this.setState({showCat:true})}}>
     
         {
           item.sections.map((e) => {
           return <View><CardView  
           cardElevation={2}
           cardMaxElevation={2}
           height={50}
           cornerRadius={5}

            ><Text>{e.name}</Text></CardView></View> 
        })
         }
        
          </TouchableOpacity>
   </View>

    }
  }

}
  />}

     




</View>


  );
  
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
