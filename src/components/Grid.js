import React from "react";
import styled from "styled-components";
import axios from "axios";
import { TbEdit } from "react-icons/tb";
import { BiTrashAlt } from "react-icons/bi";
import { toast } from "react-toastify";

const Table = styled.table`
  width: 78vw;
  /* max-width: 800px;   */
  background-color: #fff;
  padding: 1.25rem /*20px*/;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 12px;
  margin: 1.25rem, /*20px*/ auto;
  word-break: break-all;
`;
export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: center;
  border-bottom: inset;
  padding-bottom: 5px;
`;

export const Td = styled.td`
  padding-top: 0.938rem /*15px*/;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};
  cursor: ${(props) => (props.cursorPointer ? "pointer" : "auto")};
`;

const Grid = ({ teacher, setTeacher, setOnEdit }) => {
  //Edit function
  const handleEdit = (prof) => {
    setOnEdit(prof);
  };

  // Delete function
  const handleDelete = async (id_professor, tx_nome) => {
    const areUSure = window.confirm(
      `Tem certeza que deseja excluir ${tx_nome}?`
    );
    if (areUSure === true) {
      await axios
        .delete("https://web-production-2c5b.up.railway.app/delete/" + id_professor)
        .then(({ data }) => {
          const newArray = teacher.filter(
            (teacher) => teacher.id_professor !== id_professor
          );

          setTeacher(newArray);
          toast.success(data);
        })
        .catch(({ data }) => toast.error(data));
    }
  };

  //   Formating infos

  function completeGender(gender) {
    const sex = [
      { id: "m", nome: "Masculino" },
      { id: "f", nome: "Feminino" },
    ];
    var genderName = "";
    sex.forEach((objGender) => {
      if (objGender.id === gender) {
        genderName = objGender.nome;
      }
    });
    return genderName;
  }
  function completeMaritalStatus(status) {
    const maritalStatus = [
      { id: "s", nome: "Solteiro(a)" },
      { id: "c", nome: "Casado(a)" },
      { id: "d", nome: "Divorciado(a)" },
    ];
    var maritalStatusName = "";
    maritalStatus.forEach((objMaritalStatus) => {
      if (objMaritalStatus.id === status) {
        maritalStatusName = objMaritalStatus.nome;
      }
    });
    return maritalStatusName;
  }

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Código</Th>
          <Th>Nome</Th>
          <Th>Título</Th>
          <Th>Sexo</Th>
          <Th>Estado Civil</Th>
          <Th>Data de Nascimento</Th>
          <Th>Telefone</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {teacher.map((prof) => (
          <Tr key={prof.id_professor}>
            {console.log("TESTE", prof)}
            <Td alignCenter width="8%">
              {prof.id_professor}
            </Td>
            <Td alignCenter width="15%">
              {prof.tx_nome}
            </Td>
            <Td alignCenter width="8%">
              {prof.id_titulo}
            </Td>
            <Td alignCenter width="10%">
              {completeGender(prof.tx_sexo)}
            </Td>
            <Td alignCenter width="12%">
              {completeMaritalStatus(prof.tx_estado_civil)}
            </Td>
            <Td alignCenter width="22%">
              {prof.dt_nascimento}
            </Td>
            <Td alignCenter width="15%">
              {prof.tx_telefone}
            </Td>
            <Td alignCenter cursorPointer width="5%">
              <TbEdit size={20} onClick={() => handleEdit(prof)} />
            </Td>
            <Td alignCenter cursorPointer width="5%">
              <BiTrashAlt
                size={20}
                onClick={() => handleDelete(prof.id_professor, prof.tx_nome)}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;
