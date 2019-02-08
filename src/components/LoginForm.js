import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component{

    componentDidUpdate() {
        if(this.props.user){
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'MainMenu'})],
            });
            this.props.navigation.dispatch(resetAction);
        }
    }

    onEmailChange = text => {
        this.props.emailChanged(text);
    };

    onPasswordChange = text => {
        this.props.passwordChanged(text);
    };

    onButtonPress = () => {
        const { email, password } = this.props;
        this.props.loginUser({ email, password });
    };

    renderButton() {
        if(this.props.loading){
            return <Spinner size='large' />
        }
        return (
            <Button onPress={this.onButtonPress}>
                Login
            </Button>
        );
    };

    renderError(){
        if(this.props.error){
            return (
                <View style={{ backgroundColor: 'white'}}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            );
        }
    }
    
    render(){
        console.log(this.props.email)
        console.log("masuk")
        return(
            <View>
                <Header
                    centerComponent={{ text: 'Please Login', style: { color: '#fff' } }}/>
                <Card>
                    <CardSection>
                        <Input
                            label="Email"
                            placeholder="emailmu"
                            onChangeText={this.onEmailChange}
                            value={this.props.email}
                            
                        />
                    </CardSection>
                    <CardSection>
                        <Input
                            secureTextEntry
                            label="Password"
                            placeholder="Passwordmu"
                            onChangeText={this.onPasswordChange}
                            value={this.props.password}
                        />
                    </CardSection>
                    {this.renderError()}
                    <CardSection>
                        {this.renderButton()}
                    </CardSection>
                </Card>
            </View>
        )
    }
};

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}

const mapStateToProps = state => {
    const { email, password, error, loading, user } = state.auth;
    return { email, password, error, loading, user };
}

export default connect(mapStateToProps, {emailChanged, passwordChanged, loginUser}) (LoginForm);