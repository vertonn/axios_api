import GlobalStyle from "./styles/global";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "./components/Form";
import Grid from "./components/Grid";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 1.25rem /*20px*/;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem /*10px*/;
`;

const Title = styled.h1``;

const TitleTwo = styled.h2`
  font-size: 10px;
`;

function App() {
  // States
  const [teacher, setTeacher] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  // Getting data from database
  const getData = async () => {
    try {
      const res = await axios.get("https://web-production-2c5b.up.railway.app");
      setTeacher(
        res.data.sort((a, b) => (a.id_professor > b.id_professor ? 1 : -1))
      );
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, [setTeacher]);

  return (
    <>
      <Container>
        <Title>Tabela de Professores</Title>
        <TitleTwo>Formulário de criação/edição</TitleTwo>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getData={getData} />
        <Grid teacher={teacher} setTeacher={setTeacher} setOnEdit={setOnEdit} />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default App;
