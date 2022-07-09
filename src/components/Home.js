import Notes from "./Notes";

const Home = (props) => {
  const { showAlerts } = props;
  return (
    <div>
      <Notes showAlerts={showAlerts} />
    </div>
  );
};

export default Home;
