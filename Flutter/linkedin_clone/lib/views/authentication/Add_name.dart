import 'package:flutter/material.dart';
import 'package:linkedin_clone/views/widgets/Buttoms/primary_puttom.dart';
import 'package:linkedin_clone/views/widgets/Logos/linkedin_logo.dart';
import 'package:linkedin_clone/views/widgets/Textfields/input_textformfield.dart';

class add_name extends StatelessWidget {
  const add_name({super.key});

  @override
  Widget build(BuildContext context) {
    TextEditingController firstnameController = TextEditingController();
    TextEditingController lastnameController = TextEditingController();
    double screenWidth = MediaQuery.of(context).size.width;
    double screenHeight = MediaQuery.of(context).size.height;
    return Scaffold(
      body: SingleChildScrollView(
          child: Padding(
        padding: EdgeInsets.symmetric(horizontal: screenWidth / 35),
        child: Column(
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
            Text(
              "Add your name",
              style: TextStyle(
                  fontSize: screenWidth / 15, fontWeight: FontWeight.bold),
            ),
            SizedBox(
              height: screenHeight / 15,
            ),
            input_textformfield(
              controller: firstnameController,
              ischow: false,
              labelText: "First name",
            ),
            SizedBox(
              height: screenHeight / 20,
            ),
            input_textformfield(
              controller: lastnameController,
              ischow: false,
              labelText: "Last name",
            ),
            SizedBox(
              height: screenHeight / 20,
            ),
            primary_puttom(
                width: screenWidth / 2.8,
                fontSize: screenWidth / 18,
                text: "Continue",
                onPressed: () {})
          ],
        ),
      )),
    );
  }
}
