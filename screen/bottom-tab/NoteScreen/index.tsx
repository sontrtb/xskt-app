import HeaderHome from "@/components/commons/HeaderHome";
import CardUi from "@/components/ui/CardUi";
import Row from "@/components/ui/Row";
import TextUi from "@/components/ui/TextUi";
import TouchableOpacityUi from "@/components/ui/TouchableOpacityUi";
import useTheme from "@/hooks/useColor";
import { toastSuccess } from "@/lib/toast";
import { INote, useNotes } from "@/stores/useNotes";
import { PADDING_PAGE } from "@/theme/layout";
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";


function NoteScreen() {
  const color = useTheme();
  const router = useRouter()

  const { notes, deleteNote } = useNotes();

  const sortedNotes = [...notes].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleCreateNote = () => {
    router.push({
      pathname: '/note/note-form',
    })

  };

  const handleEditNote = (note: INote) => {
    router.push({
      pathname: '/note/note-form',
      params: {
        otherParam: JSON.stringify(note)
      },
    })
  }

  const handleDeleteNote = (noteId: string) => {
    deleteNote(noteId);
    toastSuccess("Thành công", "Xóa ghi chú thành công");
  };

  const renderNoteItem = ({ item }: { item: INote }) => (
    <TouchableOpacity
      onPress={() => handleEditNote(item)}
      activeOpacity={0.7}
    >
      <CardUi style={styles.item}>
        <View style={styles.noteHeader}>
          <TextUi style={[styles.noteDate, { color: color.textNeutral }]}>
            {item.date}
          </TextUi>
          <TouchableOpacity
            onPress={() => handleDeleteNote(item.date)}
            style={styles.deleteButton}
          >
            <Feather name="trash-2" size={24} color={color.primary} />
          </TouchableOpacity>
        </View>

        <TextUi>
          {item.content}
        </TextUi>
      </CardUi>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <TextUi style={[styles.emptyText, { color: color.textNeutral }]}>
        📝 Chưa có ghi chú nào
      </TextUi>
      <TextUi style={[styles.emptySubText, { color: color.textNeutral }]}>
        Nhấn nút bên dưới để tạo ghi chú đầu tiên
      </TextUi>
    </View>
  );

  return (
    <View style={[styles.root, { backgroundColor: color.bg }]}>
      <HeaderHome title="Sổ ghi" action={
        <TouchableOpacityUi onPress={handleCreateNote}>
          <Row>
            <Feather name="plus-circle" size={24} color="#fff" />
            <TextUi style={{color: "#fff"}}>Tạo mới</TextUi>
          </Row>
        </TouchableOpacityUi>
      }
      />

      <FlatList
        data={sortedNotes}
        renderItem={renderNoteItem}
        keyExtractor={(item) => item.date}
        contentContainerStyle={[
          styles.listContainer,
          sortedNotes.length === 0 && styles.listContainerEmpty,
        ]}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default NoteScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  item: {
    marginBottom: PADDING_PAGE
  },
  listContainer: {
    paddingHorizontal: PADDING_PAGE,
    paddingTop: 12,
    paddingBottom: 100,
  },
  listContainerEmpty: {
    flex: 1,
    justifyContent: "center",
  },
  noteHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  noteDate: {
    fontSize: 12,
    fontWeight: "500",
  },
  deleteButton: {
    padding: 4,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
  },
});