import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  width: 75vw;
  grid-template-columns: auto;
  grid-template-rows: auto;
  grid-template-areas: "titulo nome sexo estadoCivil dtNascimento telefone button";
  align-items: flex-end;
  gap: 0.625rem /*10px*/;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 1.25rem;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 12px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  grid-area: button;
  width: 100px;
  height: 42px;
  padding: 0 0.9rem /*10px*/;
  cursor: pointer;
  border-radius: 32px;
  border: none;
  background-color: #2c73d2;
  color: #fff;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 6px;
`;

const SelectOption = styled.select`
  width: 7.5rem /*120px*/;
  padding: 0 0.625rem /*10px*/;
  border: 1px solid #bbb;
  border-radius: 7px;
  height: 2.5rem /*40px*/;
`;

const Input = styled.input`
  width: 7.5rem /*120px*/;
  padding: 0 0.625rem /*10px*/;
  border: 1px solid #bbb;
  border-radius: 7px;
  height: 2.5rem /*40px*/;
`;

const Form = ({ getData, onEdit, setOnEdit }) => {
  const ref = useRef();

  // There something to edit?
  useEffect(() => {
    if (onEdit) {
      const prof = ref.current;

      prof.tx_nome.value = onEdit.tx_nome;
      prof.id_titulo.value = onEdit.id_titulo;
      prof.tx_sexo.value = onEdit.tx_sexo;
      prof.tx_estado_civil.value = onEdit.tx_estado_civil;
      prof.dt_nascimento.value = onEdit.dt_nascimento;
      prof.tx_telefone.value = onEdit.tx_telefone;
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const prof = ref.current;

    if (
      !prof.tx_nome.value ||
      !prof.id_titulo.value ||
      !prof.tx_sexo.value ||
      !prof.tx_estado_civil.value ||
      !prof.dt_nascimento.value ||
      !prof.tx_telefone.value
    ) {
      return toast.warn("Ei, você precisa preencher todos os campos, blz? ;)");
    }

    if (onEdit) {
      await axios
        .put("https://web-production-2c5b.up.railway.app/edit/" + onEdit.id_professor, {
          tx_nome: prof.tx_nome.value,
          id_titulo: prof.id_titulo.value,
          tx_sexo: prof.tx_sexo.value,
          tx_estado_civil: prof.tx_estado_civil.value,
          dt_nascimento: prof.dt_nascimento.value,
          tx_telefone: prof.tx_telefone.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("https://web-production-2c5b.up.railway.app/add", {
          tx_nome: prof.tx_nome.value,
          id_titulo: prof.id_titulo.value,
          tx_sexo: prof.tx_sexo.value,
          tx_estado_civil: prof.tx_estado_civil.value,
          dt_nascimento: prof.dt_nascimento.value,
          tx_telefone: prof.tx_telefone.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }
    prof.tx_nome.value = "";
    prof.id_titulo.value = "";
    prof.tx_sexo.value = "";
    prof.tx_estado_civil.value = "";
    prof.dt_nascimento.value = "";
    prof.tx_telefone.value = "";

    setOnEdit(null);
    getData();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Título</Label>
        <SelectOption name="id_titulo">
          <option></option>
          <option value="1">1 Graduado(a)</option>
          <option value="2">2 Especialista</option>
          <option value="3">3 Doutor(a)</option>
          <option value="4">4 Mestre(a)</option>
          <option value="5">5 Pós-Doutor(a)</option>
        </SelectOption>
      </InputArea>

      <InputArea>
        <Label>Nome</Label>
        <Input name="tx_nome" />
      </InputArea>

      <InputArea>
        <Label>Gênero</Label>
        <SelectOption name="tx_sexo">
          <option></option>
          <option value="m">Masculino</option>
          <option value="f">Feminino</option>
        </SelectOption>
      </InputArea>

      <InputArea>
        <Label>Estado Civil</Label>
        <SelectOption name="tx_estado_civil">
          <option></option>
          <option value="s">Solteiro(a)</option>
          <option value="c">Casado(a)</option>
          <option value="d">Divórciado(a)</option>
        </SelectOption>
      </InputArea>

      <InputArea>
        <Label>Data de Nascimento</Label>
        <Input name="dt_nascimento" type="date" />
      </InputArea>

      <InputArea>
        <Label>Telefone</Label>
        <Input name="tx_telefone" />
      </InputArea>

      <Button type="submit">Salvar</Button>
    </FormContainer>
  );
};

export default Form;
