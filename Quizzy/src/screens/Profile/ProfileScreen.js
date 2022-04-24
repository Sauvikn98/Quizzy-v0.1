import React, { useEffect } from 'react'
import { Text, ScrollView, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import UserCard from '../../components/UserCard'
import { MenuProvider } from 'react-native-popup-menu';
import { getProfilePosts } from '../../redux/actions/PostActions'
import ProfilePostCard from '../../components/ProfilePostCard'

export const ProfileScreen = (props) => {
  useEffect(() => {
    props.getProfilePosts()
  }, [])
  return (
    <ScrollView>
      <MenuProvider>
        <UserCard />
      </MenuProvider>
      <Text style={styles.Text}>My Posts: </Text>
      {
        props.post.loading && (
          <View style= {styles.container}>
            <Text style={{ fontFamily: 'OpenSans-Regular' }}>Posting... Please wait</Text>
          </View>
        )
      }
      <ScrollView>
        {
          props.post.postss.map((post) => {
            console.log(post)
            return (<ProfilePostCard post={post} key={post.id} />);
          })
        }
      </ScrollView>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    alignItems: 'center'
  },
  button: {
    width: "40%",
    alignItems: "center",
    backgroundColor: "#5350d2",
    padding: 10,
    marginTop: 20,
    borderRadius: 12
  },
  Text: {
    color: '#333',
    padding: 20,
    fontSize: 20
  }

})

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    post: state.post
  }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getProfilePosts
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)