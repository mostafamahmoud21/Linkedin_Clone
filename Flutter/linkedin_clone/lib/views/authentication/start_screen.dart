import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:linkedin_clone/views/widgets/Buttoms/CustomSignInButton.dart';
import 'package:linkedin_clone/views/widgets/Buttoms/primary_puttom.dart';

class start_screen extends StatelessWidget {
  const start_screen({super.key});

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    double screenHeight = MediaQuery.of(context).size.height;
    return Scaffold(
        backgroundColor: Colors.white,
        body: Column(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            SizedBox(
              height: screenHeight / 30,
            ),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: screenWidth / 3.8),
              child: Row(
                children: [
                  Text(
                    "Linked ",
                    style: TextStyle(
                        color: Colors.blue[800],
                        fontSize: screenWidth / 10,
                        fontWeight: FontWeight.bold),
                  ),
                  Container(
                    padding: EdgeInsets.all(2),
                    height: screenWidth / 7,
                    width: screenWidth / 9,
                    decoration: BoxDecoration(
                        color: Colors.blue[800],
                        borderRadius: BorderRadius.circular(5)),
                    child: Center(
                      child: Text(
                        "in",
                        style: TextStyle(
                            color: Colors.white,
                            fontSize: screenWidth / 10,
                            fontWeight: FontWeight.bold),
                      ),
                    ),
                  )
                ],
              ),
            ),
            Text(
              "Join a trusted community of 1P \n prolessionais",
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: screenWidth / 20),
            ),
            Container(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    "By clicking Agree & Join or Continue, you agree to the Linkedin User \n Agreement, Privacy, and Cookie Policy",
                    style: TextStyle(
                        fontSize: screenWidth / 35, color: Colors.black),
                  ),
                  Padding(
                      padding: EdgeInsets.symmetric(vertical: screenWidth / 50),
                      child: primary_puttom(
                        onPressed: () {},
                        width: screenWidth / 3.25,
                        fontSize: screenWidth / 22,
                        text: "Agree & Join",
                      )),
                  Padding(
                    padding: EdgeInsets.symmetric(vertical: screenWidth / 50),
                    child: CustomSignInButton(
                      assetName: 'assets/images/google icon.jpg',
                      text: 'Continue with Google',
                      onPressed: () {},
                      width: screenWidth / 4.5,
                      hight: 0,
                    ),
                  ),
                  Padding(
                    padding: EdgeInsets.symmetric(vertical: screenWidth / 50),
                    child: CustomSignInButton(
                      assetName: 'assets/images/facepook icon.png',
                      text: 'Continue with facebook',
                      onPressed: () {},
                      width: screenWidth / 4.5,
                      hight: 0,
                    ),
                  ),
                  InkWell(
                    onTap: () {},
                    child: Text(
                      "Sign in",
                      style: TextStyle(
                          color: Colors.blue[900], fontSize: screenWidth / 20),
                    ),
                  )
                ],
              ),
            )
          ],
        ));
  }
}
