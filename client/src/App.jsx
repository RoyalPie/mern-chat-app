import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { ChannelListContainer, ChannellContainer } from "./components";
const apiKey = "mfpyzveatbaj";

const client = StreamChat.getInstance(apiKey);
function App() {
  return (
    <div className="app__wrapper">
      {/* Chat component is a provider that provides the ChatContext */}
      <Chat client={client} theme="team light"> 
        <ChannelListContainer />
        <ChannellContainer />
      </Chat>
    </div>
  );
}

export default App;
