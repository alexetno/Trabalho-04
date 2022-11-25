import React, {useEffect, useState, useContext} from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import {useNavigation, useIsFocused} from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

import {ProdutoContext} from './EnviarProduto';

export default function Home() {
  
  const db = SQLite.openDatabase('db.MainDB');

 
  const {alteraProduto} = useContext(ProdutoContext);
  
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    resetProduto();
    pegaProdutos();
    createTable();
  }, [isFocused]);

  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql("CREATE TABLE IF NOT EXISTS produto (" +
                    "codigo INTEGER PRIMARY KEY AUTOINCREMENT, " +
                    "descricao TEXT, " +
                    "preco NUMERIC, " +
                    "quantidade NUMERIC)");
    })
  }

  const apagaTabela = () => {
    db.transaction((tx) => {
      tx.executeSql('DROP TABLE produto');
    })
  }

  const resetProduto = () => {
    alteraProduto('', '', '', '');
  }

  const pegaProdutos = () => {
    db.transaction((tx) => {
      tx.executeSql('SELECT codigo, descricao, preco, quantidade FROM produto', 
                    [],
                    (tx, resultado) => {
                      var temp = [];
                      for(let i = 0; i < resultado.rows.length; i++){
                        temp.push(resultado.rows.item(i));
                        setProdutos(temp);
                      }
                    });
    })
  }

  function novoProduto(){
    navigation.navigate('Formulario');
  }

  function enviaProdutoForm(codigo, descricao, preco, quantidade){
    alteraProduto(codigo, descricao, preco, quantidade);
    navigation.navigate('Formulario');
  }
  
  return (
    <View style={styles.container}>
      <FlatList 
        style={styles.lista}
        data={produtos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.item} onPress={() => enviaProdutoForm(item.codigo, item.descricao, item.preco, item.quantidade)}>
            <Text>ID: {item.codigo}</Text>
            <Text>Descricao: {item.descricao}</Text>
            <Text>Preco: {item.preco}</Text>
            <Text>Quantidade: {item.quantidade}</Text>
          </TouchableOpacity>
        )}  />

        <TouchableOpacity style={styles.botao} onPress={novoProduto}>
          <Text style={styles.textoBotao}>+</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  }, 
  lista: {
    marginTop: 10,
  },
  item:{
    borderBottomWidth: 2,
    padding: 3
  },
  botao: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position:'absolute',
    bottom: 20,
    right: 5,
    height: 70,
    borderRadius: 100,
     backgroundColor: 'green',
  },
  textoBotao: {
    color: 'white',
    fontSize: 30,
    lineHeight: 70
  }
});