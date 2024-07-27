import 'package:flutter/material.dart';
import 'package:linkedin_clone/views/widgets/Buttoms/CustomSignInButton.dart';
import 'package:linkedin_clone/views/widgets/Logos/linkedin_logo.dart';
import 'package:linkedin_clone/views/widgets/Textfields/input_textformfield.dart';

import '../widgets/Buttoms/primary_puttom.dart';

class signin_Scren extends StatefulWidget {
  const signin_Scren({super.key});

  @override
  State<signin_Scren> createState() => _signin_ScrenState();
}

class _signin_ScrenState extends State<signin_Scren> {
  @override
  Widget build(BuildContext context) {
    TextEditingController passwordController = TextEditingController();
    TextEditingController Emailorphonecontroller = TextEditingController();

    double screenWidth = MediaQuery.of(context).size.width;
    double screenHeight = MediaQuery.of(context).size.height;
    return Scaffold(
      body: Padding(
        padding: EdgeInsets.symmetric(horizontal: screenWidth / 25),
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(
                height: screenHeight / 30,
              ),
              Linkedin_logo(
                fontsize: screenWidth / 20,
                hight: screenWidth / 15,
                width: screenWidth / 13,
              ),
              SizedBox(
                height: screenHeight / 15,
              ),
              Container(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      "Sign in",
                      style: TextStyle(
                          color: Colors.black,
                          fontWeight: FontWeight.bold,
                          fontSize: screenHeight / 25),
                    ),
                    SizedBox(
                      height: screenHeight / 50,
                    ),
                    Row(
                      children: [
                        Text(
                          "or ",
                          style: TextStyle(
                              color: Colors.grey[700],
                              fontSize: screenWidth / 25),
                        ),
                        InkWell(
                          child: Text(
                            "Join Linkedin",
                            style: TextStyle(
                                color: Colors.blue[900],
                                fontSize: screenWidth / 23,
                                fontWeight: FontWeight.bold),
                          ),
                        ),
                      ],
                    ),
                    SizedBox(
                      height: screenHeight / 40,
                    ),
                    Padding(
                      padding: EdgeInsets.symmetric(vertical: screenWidth / 50),
                      child: CustomSignInButton(
                        assetName: 'assets/images/google icon.jpg',
                        text: 'Sign in with Google',
                        onPressed: () {},
                        width: screenWidth / 4,
                        hight: 0,
                      ),
                    ),
                    Padding(
                      padding: EdgeInsets.symmetric(vertical: screenWidth / 50),
                      child: CustomSignInButton(
                        assetName: 'assets/images/apple logo.png',
                        text: 'Sign in with Apple',
                        onPressed: () {},
                        width: screenWidth / 3.8,
                        hight: 0,
                      ),
                    ),
                    Padding(
                      padding: EdgeInsets.symmetric(vertical: screenWidth / 50),
                      child: CustomSignInButton(
                        assetName: 'assets/images/facepook icon.png',
                        text: 'Sign in with facebook',
                        onPressed: () {},
                        width: screenWidth / 4.3,
                        hight: 0,
                      ),
                    ),
                  ],
                ),
              ),
              Padding(
                padding: EdgeInsets.symmetric(
                    horizontal: screenWidth / 50, vertical: screenHeight / 50),
                child: Row(
                  children: [
                    Container(
                      color: Colors.black,
                      height: 1,
                      width: screenWidth / 2.5,
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 5),
                      child: Text("or"),
                    ),
                    Container(
                      color: Colors.black,
                      height: 1,
                      width: screenWidth / 2.5,
                    ),
                  ],
                ),
              ),
              Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: screenWidth / 25),
                    child: input_textformfield(
                      controller: Emailorphonecontroller,
                      ischow: false,
                      labelText: "Email or Phone",
                    ),
                  ),
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: screenWidth / 20),
                    child: input_textformfield(
                      ischow: true,
                      labelText: "Password",
                      controller: passwordController,
                    ),
                  ),
                ],
              ),
              SizedBox(
                height: screenHeight / 30,
              ),
              InkWell(
                onTap: () {},
                child: Text(
                  "Forgot password?",
                  style: TextStyle(
                      color: Colors.blue[900], fontWeight: FontWeight.bold),
                ),
              ),
              SizedBox(
                height: screenHeight / 30,
              ),
              primary_puttom(
                fontSize: screenWidth / 22,
                text: "Continue",
                width: screenWidth / 2.77,
              )
            ],
          ),
        ),
      ),
    );
  }
}
