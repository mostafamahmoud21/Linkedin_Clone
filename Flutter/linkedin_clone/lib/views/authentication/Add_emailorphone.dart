import 'package:flutter/material.dart';
import 'package:linkedin_clone/views/widgets/Buttoms/primary_puttom.dart';
import 'package:linkedin_clone/views/widgets/Logos/linkedin_logo.dart';
import 'package:linkedin_clone/views/widgets/Textfields/input_textformfield.dart';

class Add_emailorphone extends StatefulWidget {
  const Add_emailorphone({super.key});

  @override
  State<Add_emailorphone> createState() => _Add_emailorphoneState();
}

class _Add_emailorphoneState extends State<Add_emailorphone> {
  bool isschow = false;
  @override
  void initState() {
    bool isschow = false;
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
            isschow
                ? Text(
                    "Set your password",
                    style: TextStyle(
                        fontSize: screenWidth / 15,
                        fontWeight: FontWeight.bold),
                  )
                : Text(
                    "Add your email or phone",
                    style: TextStyle(
                        fontSize: screenWidth / 15,
                        fontWeight: FontWeight.bold),
                  ),
            SizedBox(
              height: screenHeight / 15,
            ),
            input_textformfield(
              controller: EmailorphoneController,
              ischow: false,
              labelText: "Email or Phone",
            ),
            SizedBox(
              height: screenHeight / 20,
            ),
            isschow
                ? input_textformfield(
                    controller: passwordController,
                    ischow: true,
                    labelText: "Password",
                  )
                : Container(),
            SizedBox(
              height: screenHeight / 20,
            ),
            primary_puttom(
                width: screenWidth / 2.8,
                fontSize: screenWidth / 18,
                text: "Continue",
                onPressed: () {
                  setState(() {
                    isschow = true;
                  });
                })
          ],
        ),
      )),
    );
  }
}
