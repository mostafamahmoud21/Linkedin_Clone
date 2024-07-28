import 'package:flutter/material.dart';
import 'package:linkedin_clone/views/widgets/Buttoms/CustomSignInButton.dart';
import 'package:linkedin_clone/views/widgets/Buttoms/primary_puttom.dart';
import 'package:linkedin_clone/views/widgets/Logos/linkedin_logo.dart';
import 'package:linkedin_clone/views/widgets/Textfields/input_textformfield.dart';

class join_linkedin extends StatefulWidget {
  const join_linkedin({super.key});

  @override
  State<join_linkedin> createState() => _join_linkedinState();
}

class _join_linkedinState extends State<join_linkedin> {
  @override
  bool isshow = false;
  void initState() {
    isshow = false;
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    TextEditingController EmailorphoneController = TextEditingController();
    TextEditingController passwordController = TextEditingController();

    double screenWidth = MediaQuery.of(context).size.width;
    double screenHeight = MediaQuery.of(context).size.height;
    return Scaffold(
        body: SingleChildScrollView(
      child: Padding(
        padding: EdgeInsets.symmetric(horizontal: screenWidth / 30),
        child: Column(children: [
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
                  "Join LinkedIn",
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
                          color: Colors.grey[700], fontSize: screenWidth / 25),
                    ),
                    InkWell(
                      child: Text(
                        "Sign in",
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
                input_textformfield(
                  ischow: false,
                  labelText: "Email or Phone",
                  controller: EmailorphoneController,
                ),
                SizedBox(
                  height: screenHeight / 30,
                ),
                isshow
                    ? input_textformfield(
                        ischow: true,
                        labelText: "Pasword",
                        controller: passwordController,
                      )
                    : Container(),
                SizedBox(
                  height: screenHeight / 20,
                ),
                Text(
                  "By clicking Agree & Join or Continue,you agree to the Linkedin User\nAgrement,Privacy Policy, and Cookie Policy, For phone number\nsignups we will send a verification code via SMS",
                  style: TextStyle(fontSize: screenWidth / 35),
                ),
                SizedBox(
                  height: screenHeight / 20,
                ),
                primary_puttom(
                  onPressed: () {
                    setState(() {
                      isshow = true;
                    });
                  },
                  fontSize: screenWidth / 22,
                  text: "Agree & join",
                  width: screenWidth / 3,
                ),
                isshow
                    ? Container()
                    : Padding(
                        padding: EdgeInsets.symmetric(
                            horizontal: screenWidth / 50,
                            vertical: screenHeight / 50),
                        child: Row(
                          children: [
                            Container(
                              color: Colors.black,
                              height: 1,
                              width: screenWidth / 2.5,
                            ),
                            Padding(
                              padding:
                                  const EdgeInsets.symmetric(horizontal: 5),
                              child: Text("or"),
                            ),
                            Container(
                              color: Colors.black,
                              height: 1,
                              width: screenWidth / 2.5,
                            ),
                          ],
                        ),
                      )
              ],
            ),
          ),
          isshow
              ? Container()
              : Container(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Padding(
                        padding:
                            EdgeInsets.symmetric(vertical: screenWidth / 50),
                        child: CustomSignInButton(
                          assetName: 'assets/images/google icon.jpg',
                          text: 'Continue with Google',
                          onPressed: () {},
                          width: screenWidth / 4,
                          hight: 0,
                        ),
                      ),
                      Padding(
                        padding:
                            EdgeInsets.symmetric(vertical: screenWidth / 50),
                        child: CustomSignInButton(
                          assetName: 'assets/images/facepook icon.png',
                          text: 'Continue with facebook',
                          onPressed: () {},
                          width: screenWidth / 4.3,
                          hight: 0,
                        ),
                      ),
                    ],
                  ),
                )
        ]),
      ),
    ));
  }
}
