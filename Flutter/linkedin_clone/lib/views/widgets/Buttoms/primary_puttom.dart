import 'package:flutter/material.dart';

class primary_puttom extends StatelessWidget {
  const primary_puttom(
      {super.key, required this.width, required this.fontSize, required this.text});
  final double width;
  final double fontSize;
  final String text;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
        style: ElevatedButton.styleFrom(
          padding: EdgeInsets.symmetric(horizontal: width),
          backgroundColor: Colors.blue[900],
        ),
        onPressed: () {},
        child: Text(
          text,
          style: TextStyle(color: Colors.white, fontSize: fontSize),
        ));
  }
}
