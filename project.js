function SmartHome(name) {
    this.name = name;
    this.rooms = [];
}

SmartHome.prototype.findRoom = function(room) {
    for (var i = 0; i < this.rooms.length; i++) {
        if (this.rooms[i].name === room.name) {
            console.log(room.name+" exists in the "+this.name)
            return true;
           } 
        } 
        return false;
    };

SmartHome.prototype.__roomValid = function(room){
    if(this.findRoom(room) === false){
        if(typeof room.name === 'string' && room.name.trim().length > 0){
            room.name = room.name.trim();
            return room;
        }
    }
}

SmartHome.prototype.addRoom = function (room) {
    if(this.__roomValid(room)){
        this.rooms.push(room);
        console.log(room.name + ' was added to the '+ this.name);
    } else {console.log('Invalid room name or this room already exists in the house.');}
}

function Room(name) {
    this.name = name;
    this.devices = [];
}

Room.prototype.findDevice = function(device) {
    for (var i = 0; i < this.devices.length; i++) {
        if (this.devices[i].name === device.name) {
            console.log(device.name+" exists in the "+this.name)
            return true;
           } 
        } 
        return false;
    };
    
Room.prototype.__deviceValid = function(device){
    if(this.findDevice(device) === false){
        if(typeof device.name === 'string' && device.name.trim().length > 0){
            device.name = device.name.trim();
            return device;
        }
    }
}

Room.prototype.addDevice = function (device) {
    if(this.__deviceValid(device)){
        this.devices.push(device);
        console.log(device.name + ' was added to the '+ this.name+ "room");
    } 
   else {console.log('Invalid device name or this device already exists in the room.');}
   
}

SmartHome.prototype.turnOnAllDevices = function () {
    this.rooms.forEach(function (room) {
        room.devices.forEach(function (device) {
            device.__isOn = true;
            console.log(device.name+ ' is turned on');
        });
    })
   
}

SmartHome.prototype.turnOffAllDevices = function () {
    this.rooms.forEach(function (room) {
        room.devices.forEach(function (device) {
            device.__isOn = false;
            console.log(device.name+' is turned off');
        });
    })
}

SmartHome.prototype.getDevices = function () {
    this.rooms.forEach(function(room){
        room.devices.forEach(function (device) {
            console.log(device.name);
        });
    })
   
}

SmartHome.prototype.getDeviceByName = function (name) {
    for (var i = 0; i < this.rooms.length; i++) {
        var device = this.rooms[i].devices.find(function (device) {
            return device.name === name;
        });
        if (device) {
            return device;
        } else {
            console.log("Such a device isn't registered in the system");
        }
    }
}

function Device(name, isOn){
    this.name = name;
    this._isOn = isOn;
    if(this._isOn === undefined){
        this._isOn = false;
    }
}

Device.prototype.turnOn = function(){
    this._isOn = true;
    console.log(this.name, "is on");
}

Device.prototype.turnOff = function(){
    this._isOn = false;
    console.log(this.name, "is off");
}

function Lamp(name, isOn = false, brightness){
    Device.call(this, name, isOn);
    this.__brightness = brightness;
}

Device.prototype = Object.create(Device.prototype);
Device.prototype.constructor = Lamp;

Lamp.prototype.turnOn = function () {
    Device.prototype.turnOn.call(this);
}

function AirConditioner(name, isOn = false, temperature) {
    Device.call(this, name, isOn);
    this.__temperature = temperature;
}

AirConditioner.prototype = Object.create(Device.prototype);
AirConditioner.prototype.constructor = AirConditioner;

function TVset(name, isOn = false, channel, volume) {
  Device.call(this, name, isOn);
  this.__channel = channel;
  this.__volume = volume;
}

TVset.prototype = Object.create(Device.prototype);
TVset.prototype.constructor = TVset;

var sh = new SmartHome("Name1");
var room1 = new Room('living room');
sh.addRoom(room1);
room1.addDevice(new Lamp("Lamp1"));
room1.addDevice(new Lamp("Lamp2"));
sh.getDevices();

var lamp2 = sh.getDeviceByName("Lamp2");
console.log(lamp2);
sh.getDeviceByName("Lamp2").turnOn();
sh.turnOffAllDevices();