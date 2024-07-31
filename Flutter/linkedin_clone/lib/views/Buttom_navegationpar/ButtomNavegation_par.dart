import 'package:flutter/material.dart';

class BottomNavigationPar extends StatefulWidget {
  const BottomNavigationPar({super.key});

  @override
  State<BottomNavigationPar> createState() => _BottomNavigationParState();
}

class _BottomNavigationParState extends State<BottomNavigationPar> {
  int selectedIndex = 0;

  List<Widget> _pages = [
    Center(child: Text('Home Page')),
    Center(child: Text('Video Page')),
    Center(child: Text('My Network Page')),
    Center(child: Text('Notifications Page')),
    Center(child: Text('Jobs Page')),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _pages[selectedIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: selectedIndex,
        onTap: (value) {
          setState(() {
            selectedIndex = value;
          });
        },
        backgroundColor: Colors.black87,
        selectedItemColor: Color.fromARGB(255, 255, 255, 255),
        unselectedItemColor: const Color.fromARGB(179, 91, 90, 90),
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: "Home"),
          BottomNavigationBarItem(
              icon: Icon(Icons.video_collection), label: "Video"),
          BottomNavigationBarItem(
              icon: Icon(Icons.group_sharp), label: "My Network"),
          BottomNavigationBarItem(
              icon: Icon(Icons.notifications), label: "Notifications"),
          BottomNavigationBarItem(
              icon: Icon(Icons.home_repair_service_rounded), label: "Jobs"),
        ],
      ),
    );
  }
}