import 'package:flutter/material.dart';
import 'package:linkedin_clone/views/authentication/Add_emailorphone.dart';
import 'package:linkedin_clone/views/authentication/Add_name.dart';
import 'package:linkedin_clone/views/authentication/join_linkedin.dart';
import 'package:linkedin_clone/views/authentication/sign_in.dart';
import 'package:linkedin_clone/views/authentication/start_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Add_emailorphone(),
    );
  }
}
