import 'package:flutter/material.dart';

class Linkedin_logo extends StatelessWidget {
  const Linkedin_logo({super.key, required this.fontsize, required this.hight, required this.width});
  final double fontsize;
  final double hight;
  final double width;

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    double screenHeight = MediaQuery.of(context).size.height;
    return Row(
      children: [
        Text(
          "Linked ",
          style: TextStyle(
              color: Colors.blue[800],
              fontSize: fontsize,
              fontWeight: FontWeight.bold),
        ),
        Container(
          padding: EdgeInsets.all(2),
          height: hight,
          width: width,
          decoration: BoxDecoration(
              color: Colors.blue[800],
              borderRadius: BorderRadius.circular(5)),
          child: Center(
            child: Text(
              "in",
              style: TextStyle(
                  color: Colors.white,
                  fontSize: fontsize,
                  fontWeight: FontWeight.bold),
            ),
          ),
        )
      ],
    );
  }
}
