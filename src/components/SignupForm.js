import React, { Component } from "react";
import { Text , View} from "react-native";
import firebase from "firebase";

import { CustomButton, Card, CardSection, Input, Spinner } from "../components/Common";

class SignupForm extends Component {
// To handle the text input we need the state in the action

state = { email: "", password: "", error: "", loading: false };

//Helper method onButtonPress() to Login the user
onButtonPress() {
const { email, password } = this.state;
//Firebase mathod to login using userid & password

//Clear out the Error Message on Every Login Attempt
this.setState({ error: "", loading: true });

// Authentication : Fetching data from cloud and exception handling .

firebase
.auth()
.signInWithEmailAndPassword(email, password)
.then(this.onLoginSuccess.bind(this))
.catch(() => {
firebase
.auth()
.createUserWithEmailAndPassword(email, password)
.then(this.onLoginSuccess.bind(this))
.catch(this.onLoginFailed.bind(this));

});
}




render() {
return (


    <Card>
    <CardSection>    
   <View>     
        <Text style ={{color: '#000000',fontWeight: 'bold' , fontSize: 35, paddingLeft:100, paddingBottom:10}}>Login Form</Text>
        </View>
    </CardSection>



<CardSection>
{}
<Input
autoCorrect
placeholder="user@email.com"
label="Email: "
value={this.state.email}
onChangeText={email => this.setState({ email })}
/>
</CardSection>
<CardSection>
<Input
secureTextEntry
placeholder="password"
label="Password"
value={this.state.password}
onChangeText={password => this.setState({ password })}
/>
</CardSection>
<Text style={styles.errorTextStyle}>{this.state.error}</Text>
<CardSection>
{this.renderButton()}

</CardSection>

</Card>

);
}
}

const styles = {
errorTextStyle: {
fontSize: 20,
alignSelf: "center",
color: "red"
}
};


export default SignupForm;