import React, {useState, useEffect, useContext} from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity,Alert } from 'react-native';

import {useNavigation} from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import {ProdutoContext} from './EnviarProduto';


export default function Form() {
  const db = SQLite.openDatabase('db.MainDB');
  const navigation = useNavigation();
  const {produto} = useContext(ProdutoContext);

  const [codigo, setCodigo] = useState('');
  const [inputDescricao, setInputDescricao] = useState('');
  const [inputPreco, setInputPreco] = useState('');
  const [inputQuantidade, setInputQuantidade] = useState('');

  useEffect(() => {
    setCodigo(produto.codigo);
    setInputDescricao(produto.descricao);
    setInputPreco(produto.preco);
    setInputQuantidade(produto.quantidade);
  }, [])

  const gravaProduto = async () => {
    await db.transaction(async (tx) => {
      await tx.executeSql(
        "INSERT INTO produto (descricao, preco, quantidade) VALUES (?, ?, ?)",
        [inputDescricao, inputPreco, inputQuantidade],
        (tx, resultado) => {
          if(resultado.rowsAffected > 0){
            Alert.alert('Produto adicionado com sucesso');
          }else{
            Alert.alert('Falha ao adicionar o Produto');
          }
        }
        
      );
    })
    navigation.navigate('Home');
  }

  const apagaProduto = () => {
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM produto WHERE codigo = ?',
                    [codigo],
                    (tx, resultado) => {
                      if(resultado.rowsAffected > 0){
                        Alert.alert('Produto apagado com sucesso!');
                      }else{
                        Alert.alert('Erro ao apaga o Produto!')
                      }
                    })
    })
    navigation.navigate('Home');
  }

  const alteraProduto = () => {
    db.transaction((tx) => {
      tx.executeSql('UPDATE produto SET descricao=?, preco=?, quantidade=? WHERE codigo=?',
      [inputDescricao, inputPreco, inputQuantidade, codigo],
      (tx, resultado) => {
        if(resultado.rowsAffected > 0){
          Alert.alert('Produto editado com Sucesso');
        }else{
          Alert.alert('Erro ao editar o produto!');
        }
      })
    })
    navigation.navigate('Home');
  }

  return (
    <View style={styles.container}>
        <TextInput 
          style={styles.input}
          placeholder='Descrição' 
          value={inputDescricao}
          onChangeText={(valor) => setInputDescricao(valor)}/>

        <TextInput 
          style={styles.input}
          placeholder='Preço' 
          value={inputPreco}
          keyboardType= 'numeric'
          onChangeText={(valor) => setInputPreco(valor)}/>
        
        <TextInput 
          style={styles.input}
          placeholder='Quantidade' 
          value={inputQuantidade}
          keyboardType= 'numeric'
          onChangeText={(valor) => setInputQuantidade(valor)}/>


        {(codigo == '' ? (<TouchableOpacity style={styles.botao} onPress={gravaProduto}>
          <Text style={styles.textoBotao} >Adicionar</Text>
        </TouchableOpacity>) : null )}         

        {(codigo != '' ? (<TouchableOpacity style={styles.botao} onPress={alteraProduto}>
          <Text style={styles.textoBotao} >Editar</Text>
        </TouchableOpacity>) : null)}

        {(codigo != '' ? (<TouchableOpacity style={styles.botao} onPress={apagaProduto}>
          <Text style={styles.textoBotao} >Apagar</Text>
        </TouchableOpacity>) : null)}      

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  input:{
    textAlign: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginBottom: 3,
    fontSize: 20
  },
  botao: {
    alignItems: 'center',
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 20,
    marginBottom: 5,
  },
  textoBotao: {
    color: 'white',
    fontWeight: 'bold'
  }
});