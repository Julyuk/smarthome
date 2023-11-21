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
        console.log(room.name+" doesn't exist in the "+this.name)
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

SmartHome.prototype.getRoomByName = function (name) {
    for (var i = 0; i < this.rooms.length; i++) {
        var room = this.rooms[i];
        if(room.name === name){
            console.log(room.name + ' exists in this house');
            return room;
        } else {
            console.log("Such a room isn't registered in the system");
            return null;
        }
    }
}

SmartHome.prototype.setNewRoomName = function(room, newRoomName) {
    if(this.findRoom(room) === true){
        if(typeof newRoomName === 'string' 
        && newRoomName.trim().length > 0 
        && newRoomName !== room.name 
        && this.getRoomByName(newRoomName)===null){
            var oldName = room.name;
            room.name = newRoomName.trim();
            console.log('The name of '+oldName+'was changed to'+room.name);
        }
    }
}

SmartHome.prototype.deleteRoom = function(room){
    //1 room should remain
    if ( this.findRoom(room) === true){
        if(this.rooms.length>1){
            var index = this.rooms.indexOf(room);
            this.rooms.splice(index, 1);
            console.log(room.name + ' was deleted from ' + this.name);
        } else {
            console.log("Cannot delete the last room. At least one room should always remain.");
        }
    } else{
        console.log("The specified room doesn't exist in this SmartHome.")
    }
}

SmartHome.prototype.setNewDeviceName = function (device,newDeviceName) {
    if( this.getDeviceByName(device.name) === device 
    && this.getDeviceByName(newDeviceName) === null
        && typeof(newDeviceName) === 'string' 
        && newDeviceName.trim().length>0
        ){
            var oldName = device.name;
            device.name = newDeviceName.trim();
            console.log('The name of '+oldName+'was changed to'+device.name);
    } else{
        console.log('Wrong format');
    }
   
}

TVset.prototype.setRandomChannel = function(device){

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
        if(typeof device.name === 'string' && device.name.trim().length > 0){
            device.name = device.name.trim();
            return device;
        }
}

Room.prototype.addDevice = function (device) {
    if(this.__deviceValid(device) && this.findDevice(device) === false){
        this.devices.push(device);
        console.log(device.name + ' was added to the '+ this.name);
    } 
   else {console.log('Invalid device name or this device already exists in the room.');}
   
}

function displayDeletePrompt(device, room, deleteCallback) {
    var result = prompt('Are you sure that you want to delete ' + device.name + ' from ' + room.name + '? Answer yes, no');
    if (typeof result === 'string' && result.trim().length > 0) {
        if (result.trim().toLowerCase() === 'yes') {
            deleteCallback(device, room);
        } else if(result.trim().toLowerCase() !== 'no'){
            displayDeletePrompt(device, room, deleteCallback)
        }
    }
}

Room.prototype.deleteDevice = function (device) {
    if (this.__deviceValid(device) && this.findDevice(device) === true) {
        displayDeletePrompt(device, this, function (device, room) {
            for (var i = 0; i < room.devices.length; i++) {
                if (room.devices[i].name === device.name) {
                    room.devices.splice(i, 1);
                    console.log(device.name + ' was deleted from ' + room.name);
                    break; // exit the loop once the device is deleted
                }
            }
        });
    }
}


function Device(name, isOn){
    this.name = name;
    this._isOn = isOn;
    if(this._isOn === undefined){
        this._isOn = false;
    }
}

Device.prototype.getisOnStatus = function(){
     if(this._isOn === false){
        console.log(this.name, "is off")
    } else{
            console.log(this.name, "is on")
    }
}

Device.prototype.turnOn = function(){
    if(this._isOn === false){
        this._isOn = true;
        console.log(this.name, "is on")}
}

Device.prototype.turnOff = function(){
    if(this._isOn === true){
        this._isOn = false;
        console.log(this.name, "is off")}
}

SmartHome.prototype.turnOnAllDevices = function () {
    this.rooms.forEach(function (room) {
        room.devices.forEach(function (device) {
            if(device._isOn === false){
    
                device._isOn = true;
            console.log(device.name+ ' is turned on');}
        });
    })
   
}

SmartHome.prototype.turnOffAllDevices = function (callback){
    this.rooms.forEach(function (room) {
        room.devices.forEach(function (device) {
            if(device._isOn === true){
    
            device._isOn = false;
            console.log(device.name+ ' is turned off');}
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
    var n;
    for (var i = 0; i < this.rooms.length; i++) {
        var device = this.rooms[i].devices.find(function (device) {
            n=i;
            return device.name === name;
        });
        if (device) {
            console.log(device.name + ' exists in this house, in the '+this.rooms[n].name);
            return device;
        } else {
            console.log("Such a device isn't registered in the system");
            return null;
        }
    }
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

Lamp.prototype.getCurrentBrightness = function(){
    console.log(this.__brightness);
    return this.__brightness;
}

Lamp.prototype.setBrightness = function(brightness){
    if(this._isOn === true){
        if(this.__brightness === undefined || brightness === undefined){
            this.__brightness = 35;
        } else {
            if(typeof brightness === 'number'){
                brightness= parseInt(brightness);
                if(brightness>=1 && brightness<=100){
                    this.__brightness = brightness;
                } else{
                    console.log('Wrong format');
                }
            }
        }
    } else{
        console.log('Please, turn on the lamp first');
    }
}

Lamp.prototype.setBrightnessBrighterBy1 = function(){
    var brightness = this.__brightness + 1;
    this.setBrightness(brightness);
}

Lamp.prototype.setBrightnessDullerBy1 = function(){
    var brightness = this.__brightness - 1;
    this.setBrightness(brightness);
}

function AirConditioner(name, isOn = false, temperature) {
    Device.call(this, name, isOn);
    this.__temperature = temperature;
}

AirConditioner.prototype = Object.create(Device.prototype);
AirConditioner.prototype.constructor = AirConditioner;


AirConditioner.prototype.timer = function (callback, duration) {
    if(this._isOn === false){
        this.turnOn();
    }
    setTimeout(function () {
        callback(); 
    }, duration);
};

AirConditioner.prototype.setTemperature = function(temp){
    if(this._isOn === true){
        if(this.__temperature === undefined || temp === undefined){
            this.__temperature = 20;
        } else {
            if(typeof temp === 'number'){
                temp = parseInt(temp);
                if(temp>=0 && temp<=38){
                    this.__temperature = temp;
                } else{
                    console.log('Wrong format');
                }
            }
        }
    } else{
        console.log('Please, turn on the conditioner first');
    }
}

AirConditioner.prototype.getCurrentTemperature = function(){
    console.log(this.__temperature);
    return this.__temperature;
}

AirConditioner.prototype.setTemperatureWarmerBy1 = function(){
    var temp = this.__temperature+1;
    this.setTemperature(temp);
}

AirConditioner.prototype.setTemperatureColderBy1 = function(){
    var temp = this.__temperature-1;
    this.setTemperature(temp);
}

function TVset(name, isOn = false, channel, volume) {
  Device.call(this, name, isOn);
  this.__channel = channel;
  this.__volume = volume;
}

TVset.prototype = Object.create(Device.prototype);
TVset.prototype.constructor = TVset;

TVset.prototype.setChannel = function(channel){
    if(this._isOn === true){
        if(this.__channel === undefined || channel === undefined){
            this.__channel = 1;
        } else {
            if(typeof channel === 'number'){
                channel = parseInt(channel);
                if(channel>=1 && channel<=100){
                    this.__channel = channel;
                } else{
                    console.log('Wrong channel format');
                }
            }
        }
    } else{
        console.log('Please, turn on the TV first');
    }
}

TVset.prototype.getCurrentChannel = function(){
    console.log(this.__channel);
    return this.__channel;
}

TVset.prototype.setNextChannel = function(){
    var channel = this.__channel+1;
    this.setChannel(channel);
}

TVset.prototype.setPreviousChannel = function(){
    var channel = this.__channel-1;
    this.setChannel(channel);
}

TVset.prototype.setVolume = function(volume){
    if(this._isOn === true){
        if(this.__volume === undefined || volume === undefined){
            this.__volume = 1;
        } else {
            if(typeof volume === 'number'){
                channel = parseInt(volume);
                if(volume>=1 && volume<=50){
                    this.__volume = volume;
                } else{
                    console.log('Wrong volume format');
                }
            }
        }
    } else{
        console.log('Please, turn on the TV first');
    }
}

TVset.prototype.getCurrentVolume = function(){
    console.log(this.__volume);
    return this.__volume;
}

TVset.prototype.setVolumeLouderBy1 = function(){
    var volume = this.__volume +1;
    this.setVolume(volume);
}

TVset.prototype.setVolumeQuieterBy1 = function(){
    var volume = this.__volume -1;
    this.setVolume(volume);
}

//tests
var sh = new SmartHome("Name1");
var room1 = new Room('living room')
room1.addDevice(new Lamp("Lamp1")); //Lamp1 was added to the living room
room1.addDevice(new Lamp("Lamp2")); //Lamp2 was added to the living room
sh.findRoom(room1); //false
var room2 = new Room('living roomm');
sh.addRoom(room1);
sh.addRoom(room1);
sh.addRoom('jhi');
sh.addRoom(room2);
sh.setNewRoomName(room1, 'bedroom');
sh.deleteRoom(room2);//bedroom was deleted from Name1
sh.deleteRoom(room1);//Cannot delete the last room. At least one room should always remain.
sh.deleteRoom(false);//The specified room doesn't exist in this SmartHome.
var lamp1 = sh.getDeviceByName('Lamp1');
var lamp2 = sh.getDeviceByName('Lamp2');
sh.setNewDeviceName(lamp2, 12);
sh.setNewDeviceName(lamp2, 'Lamp1');



room1.addDevice(new Lamp("Lamp1"));
room1.addDevice(new Lamp("Lamp2"));

var tv1 = new TVset('My TV1');
room1.addDevice(tv1);
sh.setNewDeviceName(tv1, 'tv1-1')


tv1.setChannel();
tv1.turnOn();
tv1.setChannel();
tv1.setChannel(2);


//sh.getDeviceByName('Lamp1');

//???
//sh.getDeviceByName('Lamp1').getisOnStatus();
//sh.turnOnAllDevices();
////sh.turnOffAllDevices();
