import 'package:flutter/material.dart';

class MyWidget extends StatelessWidget {
  const MyWidget({super.key});

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    double screenHeight = MediaQuery.of(context).size.height;
    return  Padding(
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
            );
  }
}