package au.csiro.data61.magda.crawler

import java.net.URL

import scala.util.Failure
import scala.util.Success

import akka.actor.Actor
import akka.actor.ActorRef
import au.csiro.data61.magda.api.Types._
import au.csiro.data61.magda.search.SearchProvider

/**
 * @author Foat Akhmadeev
 *         17/01/16
 */
class Indexer(supervisor: ActorRef) extends Actor {
  implicit val ec = context.dispatcher
  val searchProvider: SearchProvider = SearchProvider()

  def receive: Receive = {
    case Index(source, dataSets) =>
      searchProvider.index(source, dataSets) onComplete {
        case Success(_)      => supervisor ! IndexFinished(dataSets, source)
        case Failure(reason) => supervisor ! IndexFailed(source, reason)
      }

  }

  @throws[Exception](classOf[Exception])
  override def postStop(): Unit = {
    super.postStop()
    //    store.foreach(println)
    //    println(store.size)
  }
}