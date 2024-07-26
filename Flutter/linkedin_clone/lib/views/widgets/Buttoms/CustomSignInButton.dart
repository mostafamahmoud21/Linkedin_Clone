import 'package:flutter/material.dart';

class CustomSignInButton extends StatelessWidget {
  final String assetName;
  final String text;
  final VoidCallback onPressed;
  final double width;
  final double hight;

  CustomSignInButton(
      {required this.assetName, required this.text, required this.onPressed,required this.hight,required this.width});

  @override
  Widget build(BuildContext context) {
    
    return ElevatedButton.icon(
      icon: Image.asset(
        assetName,
        height: 24.0,
        width: 24.0,
      ),
      label: Text(
        text,
        style: TextStyle(color: Colors.black),
      ),
      style: ElevatedButton.styleFrom(
        
        backgroundColor: Colors.white,
        foregroundColor: Colors.black,
        minimumSize: Size(230, 50),
        padding: EdgeInsets.symmetric(horizontal: width, vertical: hight),
        side: BorderSide(color: Colors.grey),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(30),
        ),
      ),
      onPressed: onPressed,
    );
  }
}
