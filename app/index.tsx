import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function Home() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<any[]>([]);
  const [editId, setEditId] = useState<string | null>(null);

  // Görevleri çek
  const fetchTasks = async () => {
    const ref = collection(db, 'todos');
    const snapshot = await getDocs(ref);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Görev ekle veya güncelle
  const handleAddOrUpdate = async () => {
    if (!task.trim()) return;

    const ref = collection(db, 'todos');

    if (editId) {
      const taskRef = doc(db, 'todos', editId);
      await updateDoc(taskRef, { text: task });
      setEditId(null);
    } else {
      await addDoc(ref, { text: task });
    }

    setTask('');
    fetchTasks();
  };

  // Görev sil
  const handleDelete = async (id: string) => {
    const ref = doc(db, 'todos', id);
    await deleteDoc(ref);
    fetchTasks();
  };

  // Güncellemek için görevi doldur
  const handleEdit = (item: any) => {
    setTask(item.text);
    setEditId(item.id);
  };

  return (
    <View className="space-y-4 p-4">
      <Text className="text-center text-3xl font-bold">📝 ToDo App</Text>

      <TextInput
        placeholder="Yeni görev gir..."
        value={task}
        onChangeText={setTask}
        className="rounded-xl border border-gray-400 px-4 py-2"
      />

      <TouchableOpacity
        onPress={handleAddOrUpdate}
        className="items-center rounded-xl bg-blue-500 p-3">
        <Text className="font-semibold text-white">{editId ? 'Güncelle' : 'Ekle'}</Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row items-center justify-between border-b border-gray-200 py-2">
            <Text className="text-lg">{item.text}</Text>
            <View className="flex-row space-x-2">
              <TouchableOpacity onPress={() => handleEdit(item)}>
                <Text className="text-green-600">Düzenle</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text className="text-red-600">Sil</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
