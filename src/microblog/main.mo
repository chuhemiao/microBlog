import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import List "mo:base/List";
import Principal "mo:base/Principal";
import Microblog "mo:base/Principal";
import Time "mo:base/Time";
import Debug "mo:base/Debug";
// import Result "mp:base/Result";

actor {
  
  public type Message = {
      text : Text;
      // title : Text;
      // tags : Text;
      time: Time.Time;
      author: Text;
  };

  public type Follow_info = {
      name : ?Text;
      cid : Text;
  };

  // type Result<Ok, Err> = {
  //     #ok: Ok;
  //     #err: Err;
  // };

  public type Microblog = actor {
    follow: shared(Principal) -> async (); // 关注对象
    follows: shared query () -> async [Principal] ; // 关注列表
    reset_follows: shared () -> async (); // 取消关注
    post: shared (Text) -> async (); // 发布消息
    set_name: shared (Text) -> async (); // 设置名字
    get_name: shared query () -> async ?Text; // 获得名字
    posts: shared query (Int) -> async [Message]; // 返回发布的消息
    timeline : shared () -> async [Message]; // 返回所有关注对象发布的消息
    someone_posts: shared (Text) -> async [Message];
    get_follow_infos: shared () -> async [Follow_info];
    follow_by_text: shared (Text) -> async ();
  };

  private stable var followed : List.List<Principal> = List.nil();

  stable var follow_infos :  List.List<Follow_info> = List.nil();
  stable var name : Text = "nil nickname";
  stable var title : Text = "nothing";
  stable var visit_time : Int = 0;

  private stable var messages : List.List<Message> = List.nil();

  public shared func follow(id : Principal ) : async (){
    var unfollowed : Bool  = true;
    for(p in Iter.fromList(followed)){
        Debug.print(debug_show(p));
        Debug.print(debug_show(id));
        if(p == id){
            unfollowed := false;
        };
    };
    if(unfollowed){
        followed := List.push(id,followed);
        await update_follow_infos(Principal.toText(id));
    };
  };

  public shared query func follows() : async [Principal]{
    List.toArray(followed);
  };

  public shared func reset_follows() : async (){
    followed := List.nil();
    follow_infos := List.nil();
  };
  

  public shared (msg) func set_name(text : Text) : async () {
    name := text;
  };
  public shared query func get_name() : async Text{
    name
  };

  // 返回follow的人信息

  public shared func get_follow_infos() : async [Follow_info]{      
    List.toArray(follow_infos);
  };


  public shared func update_follow_infos(id:Text) : async (){
      let canister : Microblog = actor(id);
      let ms = await canister.get_name();
      let info : Follow_info = { name=ms;cid=id };
      follow_infos := List.push(info,follow_infos);
  };

  // 关注人的 canister  id

  public shared func follow_by_text(cid : Text) : async (){
      let id : Principal = Principal.fromText(cid);
      var unfollowed : Bool = true;
      for(p in Iter.fromList(followed)){
          if(p == id ){
              unfollowed := false;
          };
      };
      if(unfollowed){
          followed := List.push(id,followed);
          await update_follow_infos(cid);
      };
  };

  public shared(msg) func post(text:Text) : async (){
    // let message : Message = { content=text; time = Time.now(); author = name;title = title;tags = tags; };
    let message : Message = { text=text; time = Time.now(); author = name; };
    // assert(Principal.toText(msg.caller) == "exp33-minxe-lqmzo-dh3fa-ostfz-tkaue-kn7ow-6cioh-gzfw7-px7yn-pqe");
    messages := List.push(message, messages) ;
  };

  public shared query func posts(since: Time.Time,) : async [Message]{
    var filterMessage : List.List<Message> = List.nil();
    for(msg in Iter.fromList(messages)){
        if(msg.time > since){
            filterMessage := List.push(msg, filterMessage);
        };
    };
    List.toArray(filterMessage);
  };


  public shared(msg) func timeline(since: Time.Time) : async [Message]{
      var all : List.List<Message> = List.nil();

      for (id in Iter.fromList(followed)){
        let canister : Microblog = actor(Principal.toText(id));
        let msgs = await canister.posts(since);
        for(msg in Iter.fromArray(msgs)){
          all := List.push(msg,all);
        }
      };

      List.toArray(all)
  };

  // 返回其他人的博客列表 
  public shared func someone_posts(cid: Text) : async [Message]{
      let canister : Microblog = actor(cid);
      let ms = await canister.posts(0);
      ms;
  }


};
