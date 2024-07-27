import 'package:flutter/material.dart';

class input_textformfield extends StatefulWidget {
   input_textformfield({super.key, required this.ischow, required this.labelText, required this.controller});
  final bool ischow ;
  final String labelText;
  final TextEditingController controller;


  @override
  State<input_textformfield> createState() => _input_textformfieldState();
}

class _input_textformfieldState extends State<input_textformfield> {
  bool _obscureText = true;

  void _togglePasswordView() {
    setState(() {
      _obscureText = !_obscureText;
    });
  }
  

  @override
  Widget build(BuildContext context) {
    return  TextFormField(
      controller: widget.controller,
      obscureText: _obscureText,
      decoration: InputDecoration(
        labelText: widget.labelText,
        suffixIcon:widget.ischow? IconButton(
          icon: Icon(
            _obscureText ? Icons.visibility_off : Icons.visibility,
          ),
          onPressed: _togglePasswordView,
        ):null
      ),
    );
    ;
  }
}
