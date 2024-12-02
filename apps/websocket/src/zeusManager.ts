import { createClient, RedisClientType } from "redis";
import { WebSocket } from "ws";

  

  
  




  export class ZeusManager {
      private static instance: ZeusManager;
      public gymOwners: Map<string, string[]>;  // Mapping of gym owners to gym IDs
      public admins: Map<string, Admin>;
      public users: Map<string, User>;
      public adminSubscribers: Map<string, Set<WebSocket>>;  // Gym-specific admin WebSocket connections
      public userSubscribers: Map<string, Set<WebSocket>>;   // Gym-specific user WebSocket connections
  
      private constructor() {
          this.gymOwners = new Map();
          this.admins = new Map();
          this.users = new Map();
          this.adminSubscribers = new Map();
          this.userSubscribers = new Map();
      }
  
      static getInstance() {
          if (!ZeusManager.instance) {
              ZeusManager.instance = new ZeusManager();
          }
          return ZeusManager.instance;
      }

  
      

  
      async joinGymNotificationsAdmin(gymIds: string[], adminId: string, ws: WebSocket) {
          let admin = this.admins.get(adminId);
  
          if (!admin) {
              admin = { adminId, ws: new Set(), subscribedGyms: new Set() };
              this.admins.set(adminId, admin);
          }
  
          // Ensure WebSocket is unique per admin and gym subscription
          if (!admin.ws.has(ws)) admin.ws.add(ws);
  
          // Subscribe to each gym
          gymIds.forEach(gymId => {
              if (!admin.subscribedGyms.has(gymId)) {
                  admin.subscribedGyms.add(gymId);
                 
              }
              this.addAdminSubscriber(gymId, ws);
          });
      }
  
      async joinGymNotificationsUser(gymIds: string[], userId: string, ws:WebSocket ) {
          let user = this.users.get(userId);
  
          if (!user) {
              user = { userId, ws: new Set(),purchasedGyms: new Set() };
              this.users.set(userId, user);
          }
  
          // Ensure WebSocket is unique per user and gym subscription
          if (!user.ws.has(ws)) user.ws.add(ws);
  
          // Subscribe to each gym
          gymIds.forEach(gymId => {
              if (!user.purchasedGyms.has(gymId)) {
                  user.purchasedGyms.add(gymId);
              
              }
              this.addUserSubscriber(gymId, ws);
          });
      }
  
      private addAdminSubscriber(gymId: string, ws: WebSocket) {
          if (!this.adminSubscribers.has(gymId)) this.adminSubscribers.set(gymId, new Set());
          this.adminSubscribers.get(gymId)!.add(ws);
      }
  
      private addUserSubscriber(gymId: string, ws: WebSocket) {
          if (!this.userSubscribers.has(gymId)) this.userSubscribers.set(gymId, new Set());
          this.userSubscribers.get(gymId)!.add(ws);
      }
  
      async notifyAdmins(gymId: string, message: string,type:string, notificationMetaData:any) {
        console.log(gymId,message,type)
          const subscribers = this.adminSubscribers.get(gymId);
          if (subscribers) {
              subscribers.forEach(ws => {
                if(ws.readyState===WebSocket.OPEN){

                
                console.log("sending")
                      ws.send(JSON.stringify({ type, data:{
                        message,
                        time:new Date(),
                        notificationMetaData
                      } }));
                    }
              });
          }
      }
  
      async notifyUsers(gymId: string, message: string) {
          const subscribers = this.userSubscribers.get(gymId);
          if (subscribers) {
              subscribers.forEach(ws => {
                  if (ws.readyState === WebSocket.OPEN) {
                      ws.send(JSON.stringify({ gymId, message }));
                  }
              });
          }
      }
  
      async markUserAttendance(gymId: string, userId: string,gymName:string,userName:string, notificationMetaData:any) {
         let user = this.users.get(userId);
         if(user){
          let gym = user.purchasedGyms.has(gymId);
          if(gym){
            let message = `${userName} with Id ${userId} checked in at ${gymName}`
             this.notifyAdmins(gymId,message,"check-in", notificationMetaData)
          }
         }

      }

      async joinGymMembership(gymId:string,userId:string,gymName:string,userName:string, notificationMetaData:any){
        console.log("here2")
        let user = this.users.get(userId);
        if(user){
         user.purchasedGyms.add(gymId);
        
           let message = `${userName} with Id ${userId} joined at ${gymName}`
            this.notifyAdmins(gymId,message,"join-in",notificationMetaData)
        
        } 
      }

      disconnect(ws:WebSocket){
        console.log("Disconnect")
      }
  }
  
  // Admin and User type definitions

  

type Admin = {
  adminId: string;
  ws: Set<WebSocket>;
  subscribedGyms: Set<string>;
};

type User = {
  userId: string;
  ws: Set<WebSocket>;
  purchasedGyms: Set<string>;
};
