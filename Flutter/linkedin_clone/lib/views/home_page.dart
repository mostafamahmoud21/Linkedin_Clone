import 'package:flutter/material.dart';

class home_page extends StatefulWidget {
  const home_page({super.key});

  @override
  State<home_page> createState() => _home_pageState();
}

class _home_pageState extends State<home_page> {
  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    double screenHeight = MediaQuery.of(context).size.height;
    return Scaffold(
      appBar: AppBar(
        leading: Padding(
          padding: const EdgeInsets.all(5.0),
          child: CircleAvatar(
            backgroundColor: const Color.fromARGB(255, 7, 6, 6),
          ),
        ),
        title: InkWell(
          onTap: (){},
          child: Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(5),
                color: Colors.grey[300],
              ),
              height: 35,
              child: Row(
                children: [
                  Icon(
                    Icons.search,
                    color: Colors.grey[800],
                  ),
                  Text(
                    " Search",
                    style: TextStyle(
                        color: Colors.grey[800], fontSize: screenWidth / 20),
                  )
                ],
              )),
        ),
        actions: [IconButton(onPressed: () {}, icon: Icon(Icons.message))],
      ),
    );
  }
}
