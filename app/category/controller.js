const  mongoose  = require('mongoose');
const categoriModel = require('./model');
module.exports = {
  index: async(req,res) => {
      try {
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");

        const alert = { message: alertMessage, status: alertStatus }
        const categori = await categoriModel.find();
        console.log("alert >>");
        console.log(alert);
        res.render('admin/categori/view-categori', {categori, alert});
      } catch (error) {
          req.flash('alertMessage', `${error.message}`);
          req.flash('alertStatus', 'danger');
          res.redirect('/categori'); 
      }
  },
  viewCreate: async(req, res) => {
    try {
        const alertMessage = req.flash("alert message");
        const alertStatus = req.flash("alert status");
        res.render('admin/categori/create')
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/categori'); 
    }
  },
  actionCreate : async(req, res) => {
    try {
        const alertMessage = req.flash("alert message");
        const alertStatus = req.flash("alert status");
        const categori = await categoriModel({
            _id : new mongoose.Types.ObjectId,
            name : req.body.name
        })
        await categori.save();

        req.flash('alertMessage', "Berhasil Tambah Data");
        req.flash('alertStatus', "success");
        res.redirect('/categori');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/categori'); 
    }
  },
  viewEdit: async(req, res) => {
    try {
        const alertMessage = req.flash("alert message");
        const alertStatus = req.flash("alert status");
        const categori = await categoriModel.findById({_id : req.params.id})
        res.render('admin/categori/edit', {categori})
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/categori'); 
    }
  },
  actionEdit: async(req,res) => {
    try {
      const alertMessage = req.flash("alert message");
      const alertStatus = req.flash("alert status");
      const categori = await categoriModel.updateOne({
        _id: req.params.id
      },{name: req.body.name}).then();
      req.flash('alertMessage', "Berhasil Ubah Data");
        req.flash('alertStatus', "success");
      res.redirect("/categori");
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/categori'); 
    }
  },
  actionDelete: async (req, res) => {
    try {
      const alertMessage = req.flash("alert message");
      const alertStatus = req.flash("alert status");
      const categori = await categoriModel.deleteOne({
        _id: req.params.id
      }).then();
      req.flash('alertMessage', "Berhasil Hapus Data");
        req.flash('alertStatus', "success");
      res.redirect("/categori");
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/categori'); 
    }
  }
};